---
layout: post
title:  Advanced Functional Programming
categories: functional programming
---
In the [previous blog post]({% post_url 2016-04-16-intro-to-functional-programming %}) we we talked about the core principles of functional programming. Now it is time to see how we can apply those principles in building real-world applications.

## The Real World

While pure functional programming is very clean and beautiful, we must provide a way for our programs to interact with the outside world, and that creates some challenges like:

- Managing state
- Dealing with side effects
- Performing sequential operations

A programmer has a solution to every problem, so let's go over these one by one and show them who is the boss!

### Managing State

Most cool things have to keep some information about the outside world, for example:

- The [Tesla's autopilot](https://www.teslamotors.com/presskit/autopilot){:target="_blank"} must not only know where the road is now, but also where the road *was* a few seconds before, so that it can drive safely.

- [Siri](http://www.apple.com/ios/siri/){:target="_blank"} must remember what you just asked, before it can look for the answer.

**A question pops up:**

> **Where** do you keep such information, without using some kind of globally present, mutable, side effecting state, bro?

Here's a short answer to this question:

**You create a function that takes the current state as the input, and returns the next state as the output. Than you call that function [recursively]().**

This is a solution I learned from the [Elixir language](http://elixir-lang.org/docs.html){:target="_blank"} and its killer [GenServer behaviour](http://elixir-lang.org/docs/stable/elixir/GenServer.html){:target="_blank"}.





### Sequential Operations

### Dealing With Side Effects