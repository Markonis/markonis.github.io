---
layout: post
title:  Design Around Frequency of Change
categories: programming
---

> Maintainability is the name of the game in software.

**The reality of life is that everything changes...**

*And in the world of programming, this is especially true. So much so, that we can basically assess the quality of code by how easy it is to change.*

There will always be one more feature request, and one last minute adjustment. So we as programmers, need to learn how to build software, that can adapt to new feature requests, market conditions and so on...

## Being a Programmer is Hard

The thing about being a programmer is that most of the time you don't actually have enough domain knowledge about the product you are building. And yet you have to deliver all the features on time...

It is true that with some practice you get better, but this post is about a technique of reasoning that will give you some good mileage from the get-go.

**As always, there are many solutions to a given problem, but first, let's rule out the wrong ones:**

- **Spaghetti code** - too many dependencies
- **Lasagna code** - too many layers
- **Hipster code** - too many frameworks

Ok, now that we have that going for us, let's reflect on some of the principles established by the advanced historic civilizations. These stand true even today:

- **Open-closed principle** - to add a feature, you only write new code, and do not modify the existing code.
- **Single-responsibility principle** - making one part of the code do many different things will make all other parts of the code depend on it, and you get spaghetti code.

### When Things Start Changing

It is inevitable, our code will have to change!

So how can we avoid spending sleepless nights working on a feature which looks like a small change from the outside, but is actually a huge change in how the system internally works?

**It is all about asking the right questions.**

With time I've learned that preparing to build a feature is really a **three** step process.

**First** I ask myself:

> What are the different parts that make up this feature?

This is where I rely on my experience and knowledge in software design to split up the feature into smaller parts, based on what makes sense to me.

**Secondly**, when I have the feature divided up like that in my head, I then try to find the connections between them, and I look for the parts that are tightly coupled with one another.

**Thirdly**, and most importantly, I take one of those tightly coupled parts and ask the following question:

> How frequently do you expect this part to change?


This is where I use the domain knowledge of the person who requested the feature to help me better understand what will be expected in the future. That is the way to validate my hypothesis about which parts can be coupled together.

**The most important thing is to never tightly couple parts of your code, which you expect to change at a different rate.**

I want to point out that sometimes it is not apparent which things are going to change more often than others. But that doesn't mean that you should go ahead a put together an implementation that makes the most sense at first.

Be the scientist instead - create a hypothesis, and validate it. Always.

**A good rule of thumb to determine if you've not done your homework properly is when you find yourself wanting to ask the client:**

> Why do you want to do it that way?

Remember that your view of the feature is sometimes very different from the view of the person who asked for it - and there must be a reason for that. So instead of jumping right into a discussion trying to prove that their solution is sub-optimal, start asking a lot more questions.

### TL;DR

1. **Always ask the client which parts of the feature they expect to change more often.**
2. **Immediately isolate those parts of the code from the ones that are not expected to change frequently.**




