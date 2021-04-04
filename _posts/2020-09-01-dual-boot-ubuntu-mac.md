---
layout: post
title: "Dual Booting Ubuntu on Macbook Pro"
date: 2020-09-01
---
<p>
Ubuntu Version: 20.04
<br>
Macbook Pro Late 2011: OS - Sierra
</p>

<p>
Before attempting this, back up your Macbook. This is only a write up of my own journey with my very dated Macbook Pro. I have an SSD running in it that replaced the hard drive and maxed the RAM to 16GB.
<br>
The following takes steps from several guides I saw and will link below. I was having issues updating my Macbook Pro to High Sierra due to the App store not being able to be functionally apply the update to my outdated OS...because I had Sierra. So, I am stuck in a circular logic hell that prevented me from securely updating. So I decided to go forward and try dual booting Ubuntu 20.04 as a side project.
</p>

<p>
Things needed: USB with Ubuntu 20.04. I used good old Etcher software for this.
</p>

<h2>Setting up the Disk on Macbook Pro</h2>
<p>
Step 1:
<br>
Use "Disk Utility" to resize disk and allocate space to the section that will hold Ubuntu (I put about 80GB). No need to create a new partition.
<p>

<p>
Step 2:
<br>
From this guide: <a href="https://www.petercheng.net/posts/ubuntu-on-macbook-pro/" target="_blank">https://www.petercheng.net/posts/ubuntu-on-macbook-pro/</a>
<p>
"Next, install rEFInd, which is available <a href="https://sourceforge.net/projects/refind/" target="_blank">here</a>, and run the refind-install binary. Most likely you’ll see an error message about System Integrity Protection being enabled. As the error message suggests, we can either install from the recovery partition, or temporarily disable SIP. To get into recovery mode, hold command + r while booting, and from there a terminal can be accessed via the Utilities menu. ... I ran <code>csrutil disable</code> to disable SIP...After this process, you should now see the refind menu whenever you boot. You’ll be able to choose between macOS and any other operating systems you load, as well boot from external drives."
</p>

<p>
Step 3.
<br>
After getting rEFInd start up screen working after reboot, you should be able to see the options provided to boot. With the USB booteable drive plugged in, you should be able to start the process with your bootable drive by selecting "Boot EFI\boot\... entry (rEFInd)". This will start the Ubuntu installation process.
</p>

<p>
Step 4.
<br>
The following is from this guide: <a href="https://www.lifewire.com/dual-boot-linux-and-mac-os-4125733" target="_blank">https://www.lifewire.com/dual-boot-linux-and-mac-os-4125733</a>
<br>
&ast; You will come across options for "Installation Type". Select "Something Else" and select the partition you allocated for Ubuntu.
<br>
&ast; Use the Use as drop-down menu to select the file system to use, preferably the ext4 journaling file system.
<br>
&ast; Use the Mount Point drop-down menu to select the forward-slash ( / ), which is called the root. Select OK.
</p>

<p>
Potential problems:
<br>
&ast; If you messed up your partition that is okay. Use the Mac OS Recovery system and back up from an external hard drive.
<br>
&ast; If the Ubuntu OS does not pick up on the wifi Driver. See if you can detect by running <code>lscpci</code> in the terminal. Download "Additonal Drivers" and install the wifi card through there.
</p>