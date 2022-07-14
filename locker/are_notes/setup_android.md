# Notes for Setup

## Very helpful links:

- [Rooting Android](https://www.xda-developers.com/how-to-install-magisk/)
- [Frida on Android](https://frida.re/docs/android/)

## Detecting Archiecture on device:

`adb shell`

`getprop ro.product.cpu.abi`

## Frida Operations:

### To kill Frida if process is hanging:

```
adb shell 
ps | grep frida-server 
or 
ps -e | grep frida-server 

kill -9 pid
```

### List packages on Device

`adb shell cmd package list packages`










