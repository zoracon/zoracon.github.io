---
layout: post
title: "Dabbling with Bard: Things I Found Useful and Would Like To Happen"
date: 2023-05-11
---

Yesterday, at Google I/O, a lot of announcements came out about generative A.I. and honestly it's very overwhelming to see chatbots we were told were going to be useful in 2015-2017 get a sudden new life again. Hell, I remember when FB Developer Circles pushed chatbots as a center stage product to develop and then basically abandoned the effort at large. Especially with their local Developer circles. The one I was in hasn't posted in five years.

Anyway, Bard is still in it's early days and I guess the evolution of this is integrating Bard into the developer workflow. I imagine there will be a ChatGPT or Bard plugin for your IDE coming soon (if one isn't around already).

NOTE: I understand that last paragraph is filled with security and privacy implications. I will leave that to my day job though. Let me just enjoy things and pretend for a moment that things are fine. This is also not an endorsement of Bard.

So far I been plugging in code I wrote in languages I am less familiar with but _know enough_ to create programs. I use a go program I wrote up that dumps host info into a JSON output some weeks back. It's very bare and not well structured honestly. However, I wanted to see how I could improve it, using Bard.

1. I asked the broad question of how I could improve it.

	[code](https://github.com/zoracon/tools/blob/main/hostinfo.go)

	PROMPT: "How can I improve this Go Code?"

	For brevity I summarized a bit here.
	```
	- Use descriptive variable names
	- Use constants for values that do not change
	- Use error handling to gracefully handle errors that may occur
	- Use functions to group related code together. For example, you could create a function called getSystemInfo() that calls getOsInfo(), getNetInterface(), and getRoutes().
	- Use comments to explain what your code is doing.

	Here is an example of how you could improve your code:
	```
	[code](https://gist.github.com/zoracon/ac1e5d8901e64f4e46573c1d1861e9ca)

2. I asked Bard to output to a JSON file on the CLI. I usually use jq.

	Prompt: "give me the command to output this code with jq utility"

	```
	$ go run hostinfo.go | jq > host.json
	```

3. Now, I know for a fact I could just rewrite the code to create the JSON 	file. Closing the unnecessary `jq` step. So I asked Bard to do it.

	PROMPT: "Amend this code to output to a json file with the name host.json"

	"This code will first call the ListData() function, which will collect the host's system and networking information. The output of the ListData() function will be a JSON string. The code will then write the JSON string to a file called host.json."

	[code](https://gist.github.com/zoracon/360a6d8ff97716dbeb94ac2f129e82c9)

	Now here I ran into Bard missing a dependency change here with the additional functionality.

	```
	import (
		"encoding/json"
		"fmt"
		"os/exec"
	)

	file, err := os.Create("host.json")
	```
	^ 
	This change throws `undefined: os`.

	Just have adjust to add the "os" package.

	```
	import (
		"encoding/json"
		"fmt"
		"os"
		"os/exec"
	)
	```

This was fairly simplistic golang that was written under 10 minutes before I threw it in Bard. But it was an interesting exercise and first go. I did ask Bard to display code in Github gists for me but it gave me completely different code. So I am not sure why this discrepancy is appearing.

Next prompts I will try:
- Refactoring existing code from older projects that utilize jQuery (I know, I know. I was a different person 2011-2015).
- Rust error handling
- Writing unit tests
- More web scraping to describe the code from other sources

I would also like more safeguards in a tool like this. Like upon submission, Bard catching if I was an inexperienced developer accidentally pasting a AWS key in my example. I'd like Bard to point that out and swap the key for a generic placeholder. Right now Bard is an out of dev flow tool (for now) that wouldn't get caught by more integrated code scanning tools.





