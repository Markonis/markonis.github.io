---
layout: post
title:  "Keep The Ball Rolling"
date:   2016-04-07 20:11:32 0500
categories: lean feature development
---

Today I will present my view on how *throwing away* half of every feature can help build a better product.

## How Companies Work

The business people, developers and advisors all come together to brainstorm the next few months of development. We all have a ton of fun moving sticky notes around and writing on the whiteboard - one of my favorite things to do! We produce an endless wall of feature requests:

<img src="/images/sticky-notes.jpg">

## How Companies Actually Work

The dream of building a perfectly rounded product that will keep rolling the company forward is just that - a dream! The reality is that a product is like a child, you have to hold it's hand for a year or two until it starts walking with confidence.

**Good entrepreneurs** understand that the product will have to change often in order to fit customer's needs.

**Best entrepreneurs** make money in the process of changing the product.

## The Curve Ball

The key is to make the product usable *first*, and then find ways to improve it *later*. You have to ask the question:

> What does my customer need to do?

**And not**:

> What is the ideal way to do it?

This is important because often the user actually wants to do **one simple thing**, and it is your visionary mind, who is telling you that the user will only accept a sophisticated product.

### Feature Request

We store data in our application. Data changes over time... Some users will have to use old data, that is for some reason obsolete or not relevant anymore to the new users.

### The Solution

Make a *version control* system for data we store. Allow the user to choose a specific date and then load the correct version of the data.

Reaction of the engineering team:

> Oh man, what about foreign key references? Bring in the whiteboard, give us 2 weeks and unlimited coffee.

<img src="/images/developers.jpg">

Reaction of the user:

> Cool, but I need to use the old data **now**.

### The Actual Solution

Default to the newest version of the data for all users, and *scrap the ~~version control~~*. If the user needs an older version, allow them to manually enter their own data.

Yes, that simple!

Reaction of the engineering team:

> Will be on staging tomorrow, no need for the whiteboard, **but keep the coffee!**

Reaction of the user:

> Perfect, you rock! What about this other feature?

#### Benefits

- You get to sell the product **today**.
- The users are getting what they actually **need**.
- The engineering team can work on new and exciting features sooner.
- The product is not getting bloated with complex code, and will be easier to maintain in the future. This is important because all the complexity you add today will slow down development tomorrow.

<center><img src="/images/seal-of-approval.jpg" style="height: 300px;"></center>