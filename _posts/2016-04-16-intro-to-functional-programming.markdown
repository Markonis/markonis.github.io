---
layout: post
title:  "Intro To Functional Programming"
date:   2016-04-16 10:30:24 0100
categories: elixir tips
---

> What is functional programming, and why does it matter?

Here is a blog post which answers these questions in simple language, outlining the most important principles of functional programming, and how they add up to a really powerful set of tools.

## Core Principles

Being built on the mathematical foundations of [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus), functional programming introduces a couple of foundational concepts:

- Higher order functions
- Pure functions
- Immutable data

Let's go over them one by one and try to see the benefits they bring.

### Higher order functions

In functional languages the **function** is the main building block of your code. The same way you can create and pass around objects in an object-oriented language, in a functional language you can create and pass around functions. Simply put:

**A function can be created and then assigned to a variable, or passed as an argument of another function.**

A higher order function is one that can accept another function as its argument.

This is a very powerful concept which allows for a natural implementation of [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control), which is one of the most important design principles in software design.

One can say that the object-oriented design patterns such as:

- [Template method](https://sourcemaking.com/design_patterns/template_method)
- [Strategy](https://sourcemaking.com/design_patterns/strategy)
- [Visitor](https://sourcemaking.com/design_patterns/visitor)

are just workarounds for the lack of support for higher order functions in traditional OO languages.

In functional programming everything is build around composing simple functions together to build complex behavior. You can see a beautiful example of that in the [Elixir programming language](http://elixir-lang.org/docs.html) and the [documentation for the Enum module.](http://elixir-lang.org/docs/stable/elixir/Enum.html)

### Immutable Data

Changing some object in the code actually creates a new object with the resulting value, and the old one continues to exist unchanged.

This means that you never actually transform any data, you as a programmer just have to *find the relations between different objects, and then write **functions** to express those relations in code.*

### Pure Functions

A function simply expresses a **mapping** or a **relation** between the input and the output. As simple or as complex that mapping may be, we should still follow some rules to avoid shooting ourselves in the foot.

There are only two rules about *pure* functions:

1. Given a particular input **twice**, a *pure* function will return the same output **both times**.
2. While figuring out how to return the output, a *pure* function will **never prevent another function from following the first rule.**

In most programming languages these two rules boil down to a single rule:

**A pure function will never change global state.**

### Benefits of Functional Programming

- Knowing that a function will consistently return the same result given the same set of inputs allows you to use and test that function as a [black box](https://en.wikipedia.org/wiki/Black-box_testing).

- Parallelization of your code becomes very simple. Once you know that all you need in order to invoke a function is the parameters you need to pass, then you can run that function on another machine or multiple machines, without having to recreate the global state of the application around it.

- Multithreaded applications never have to deal with the [producer - consumer problem](https://en.wikipedia.org/wiki/Producer–consumer_problem). Instead threads interact by passing messages. Messages can be queued and are by definition non-blocking. The Elixir programming language [takes advantage of this in a big way](http://elixir-lang.org/getting-started/processes.html).

- The code becomes modular and simple to reason about, which improves productivity of the developer team and the reliability of the end product.