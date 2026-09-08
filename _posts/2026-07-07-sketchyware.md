---
layout: post
title: "Defining Sketchyware on Android"
date: 2026-07-07
---

In 2023, I coined a term while [investigating my kid's tablet for malware](https://techcrunch.com/2023/11/16/childrens-tablet-has-malware-and-exposes-kids-data-researcher-finds/) after seeing some "yellow" flags: "sketchyware." I don't know if I was actually the first to use this term, but I couldn't find it on Wikipedia or in other reputable sources. So, for now, let's say I was.

"Sketchyware" is meant to encompass an ecosystem of applications that creates conditions for future attacks and malware campaigns, whether by design, pure laziness, or intentional neglect. I primarily focused on pre-installed applications that can come on an Android-based device, such as Samsung pre-installing Facebook.

One example I witnessed involved a manufacturer having its own Firmware Over the Air (FOTA) update system. This FOTA channel had previously been classified as _malware_ but was _still allowed to operate freely in the Android ecosystem_, as if nothing had happened. I even received confirmation that the updated FOTA channel wasn't detected as malware. However, the lack of _any_ operational consequences for having operated as malware was surprising to me.

This investigation was largely treated as a "one-off." Maybe that was because I didn't take down or identify a C2 infrastructure or discover a new, fancy malware strain. That is a rant for a different day, when it comes to security reporting, ego, and the pursuit of the new and shiny.

However, the investigation did help me push for a framework that addressed this valid threat apparatus. This was especially important because the device was tied to a much larger network of pre-infected devices: infrastructure supporting 10 million devices in a malicious residential proxy scheme, according to [Google](https://blog.google/innovation-and-ai/technology/safety-security/google-taking-legal-action-against-the-badbox-20-botnet/).

The main basis of sketchyware doesn't operate only on the layers consumers can see. It often operates on layers controlled and shaped by manufacturers and distributors.

**"Main Modules"**

More often than not, mainline modules or Android system components—from innocuous to malicious—can be customized by a device manufacturer. Examples include components that handle Bluetooth communications, tethering, and Wi-Fi. While these modules can come with a standard implementation that OEMs can use, there is room for them to customize and update them as needed.

This creates room for a fragmented ecosystem of frankenmodules that either fulfill carrier requirements or are manipulated for another purpose. This is prime sketchyware territory.

Sideloading has been a recent focus of consumer threat discussions, but honestly, it is the least of my worries when it comes to the threats that can come with these devices. For me, the greater concern is pre-installed applications from often unknown or unclear sources.

**"FOTA"**

Most OEMs are allowed to update Android system apps at their own discretion. These channels are often regulated only by a connection to "some server," and it isn't clear how or when they apply security patches. A tablet could have an Android security patch from 2019 but still allegedly receive updates from the manufacturer today.

A clear lack of transparency and visibility into what is being updated is another characteristic of Android sketchyware. For now, shady FOTA apps are simply called "PUPs," or Potentially Unwanted Programs. Of course, you would need to know they are there before you could decide whether you want them.

**"System-Level List"**

These applications have the highest privileges on your Android device. For example, a device with a MediaTek chip can have system-level apps such as "Engineering Mode." This provides a way to adjust functional settings from the manufacturer's defaults.

While it isn't a consumer-ready app, it is one of the many vectors that exist on Android devices and are largely untracked and unaudited. These tools are created under a model similar to that of your local gas company: a technician can inspect your meter directly because they are the experts responsible for fixing problems. On Android devices, this translates to tool interfaces being left live so that original manufacturers can manage the devices directly.

**Binary Transparency**

What is that? It doesn't necessarily prevent malware-laced firmware, but it can help good-faith actors provide an immutable way to demonstrate that their devices haven't been tampered with or modified.

Right now, a typical consumer wouldn't know the real security differences between a CalyxOS-based device and a rogue Android device purchased from Amazon. How would anyone know without the proper tools?

This year, Android moved to provide [binary transparency](https://blog.google/security/bringing-binary-transparency-to-the-android-ecosystem/) not only for Pixel devices, but also for Google-produced applications and, probably even more importantly, mainline modules.

The only issue is that the average user isn't necessarily able to access this information with just a little technical knowledge.

_"This enables users to verify that their system image and the Google applications running on their device are all production software."_

Researchers can, but the average user generally cannot. My hope is that there will be a way to provide default reporting through the system-image pipeline in the near future.

My main motive is not to define and classify my own realm of malware or even expand on it. I want to end the sketchyware aspects of Android so that I don't have to write about them 20 years from now.

Shout out to "Bunnie" for helping me through some of my thoughts.
