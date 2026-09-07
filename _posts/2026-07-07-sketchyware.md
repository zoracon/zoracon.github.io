---
layout: post
title: "Defining Sketchyware on Android"
date: 2026-07-07
---

In 2023, I coined a term while [investigating my kid's tablet for malware](https://techcrunch.com/2023/11/16/childrens-tablet-has-malware-and-exposes-kids-data-researcher-finds/) after seeing some "yellow" flags: "sketchyware." I don't know if I was actually the first to use this term, but I couldn't find it on Wikipedia or in other reputable sources. So, for now, let's say I did.

"Sketchyware" is meant to encompass an ecosystem of applications that creates conditions for future attacks and malware campaigns by design. Whether it was pure laziness or intentional. I primarily focused on pre-installed applications that can come on an Android-based device, such as Samsung pre-installing Facebook. One example I witnessed involved a manufacturer having its own Firmware Over The Air (FOTA) update system. This FOTA channel had previously been classified as _malware_ but was _still allowed to operate freely in the Android ecosystem_, as if nothing had happened. I even received confirmation that the updated FOTA channel wasn't detected as malware, great but not having _any_ operational consequences from operating was pretty surprising to me.

This investigation was largely treated as a "one-off." Maybe that was because I didn't take down or find a C2 infrastructure, or discover a new, fancy malware strain. That is a rant for a different day when it comes to security reporting, ego, and the new shiny. However, the investigation did help me push for a framework that addressed this valid threat apparatus. This was especially important because the device was tied to a much larger network of pre-infected devices: infrastructure supporting 10 million devices in a malicious residential proxy scheme, according to [Google](https://blog.google/innovation-and-ai/technology/safety-security/google-taking-legal-action-against-the-badbox-20-botnet/).

The main basis of sketchyware doesn't just operate on the layers consumers can see. It often operates on layers controlled and shaped by the manufacturers and distributors.

**"Main Modules"**

More often than not, from innocuous to malicious, there are mainline modules or Android system components that can be customized by a device manufacturer. Examples include handling Bluetooth communications, tethering, and Wi-Fi. While these modules can come with a standard implementation that OEMs can use, there is room for them to customize and update them as needed. This creates room for a fragmented ecosystem of frankenmodules that either fulfill carrier requirements or are manipulated for another purpose. This is prime sketchyware territory.

Sideloading has been a recent focus of consumer threat discussions, but honestly, it is the least of my worries when it comes to the threats that can come with these devices. For me, the greater concern is pre-installed applications from often unknown or unclear sources.

**"FOTA"**

Most OEMs are allowed to update Android system apps at their own discretion. These channels are often regulated only by a connection to "some server," and it isn't clear how or when they apply security patches. A tablet could have an Android security patch from 2019 but still allegedly receive updates from the manufacturer today. A clear lack of transparency and visibility into what is being updated is another characteristic of Android sketchyware. For now, shady FOTA apps are simply called "PUPs," or Potentially Unwanted Programs. Of course, you would need to know they are there before you could decide whether you want them.

**"System-Level List"**

These applications have the highest privileges on your Android device. For example, a device with a MediaTek chip can have system-level apps such as "Engineering Mode." This provides a way to adjust functional settings from the manufacturer's defaults. While it isn't a consumer-ready app, it is one of the many vectors that exist on Android devices and are largely untracked and unaudited. Since they are created with the same model as your local gas company. Of course the technician and take a look at you meter directly. They are the experts to fix the problem. This translates to tool interfaces being left live on many Android devices, for the original manufacturers to directly manage themselves.

**Binary Transparency**

What is that? It doesn't necessarily prevent malware-laced firmware, but it can facilitate good-faith actors in providing an immutable way to demonstrate that their devices haven't been tampered with or modified. Right now, a typical consumer wouldn't know the real security differences between a CalyxOS-based device and a rogue Android device purchased from Amazon. How would anyone without the proper tools?

This year, Android moved to provide [binary transparency](https://blog.google/security/bringing-binary-transparency-to-the-android-ecosystem/) not only for Pixel devices, but also for Google-produced applications and, probably even more importantly, mainline modules.

The only issue is that the average user isn't necessarily able to access this information with just a little technical knowledge.

_"This enables users to verify that their system image and the Google applications running on their device are all production software."_

Researchers can, but the average user generally cannot. My hope is that their be a way of default reporting through the pipeline of system images in the near future.

My main motive is to not define and classify my own realm of malware or even expand on it. I want to basically end the sketchyware pieces of Android so I don't have to write about it 20 years from now. 

See you online.
