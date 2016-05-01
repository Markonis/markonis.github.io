---
layout: post
title:  "Intro To Functional Programming"
date:   2016-04-16 10:30:24 0100
categories: functional programming
---

> What is functional programming, and why does it matter?

Here is a blog post which answers these questions in simple language, outlining the most important principles of functional programming, and how they add up to a really powerful set of tools.

## Core Principles

Being built on the mathematical foundations of [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus), functional programming introduces a couple of foundational concepts:

- Higher order functions
- Immutable data
- Pure functions

Let's go over them one by one and try to see the benefits they bring.

### Higher Order Functions

In functional languages the **function** is the main building block of your code. The same way you can create and pass around objects in an object-oriented language, in a functional language you can create and pass around functions. Simply put:

**A function can be created and then assigned to a variable, or passed as an argument of another function.**

A higher order function is one that can accept another function as its argument.

This is a very powerful concept which allows for a natural implementation of [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control), which is one of the most important design principles in software development.

One can say that the object-oriented design patterns such as:

- [Template method](https://sourcemaking.com/design_patterns/template_method)
- [Strategy](https://sourcemaking.com/design_patterns/strategy)
- [Visitor](https://sourcemaking.com/design_patterns/visitor)

are just workarounds for the lack of support for higher order functions in traditional OO languages.

In functional programming everything is built around composing simple functions together to build complex behavior. You can see a beautiful example of that in the [Elixir programming language](http://elixir-lang.org/docs.html) and the [documentation for the Enum module.](http://elixir-lang.org/docs/stable/elixir/Enum.html)

### Immutable Data

In short: when we want to change the state of an object, we first make a copy of the original object, and than we apply the changes to the copy instead.

> Why?

It is much easier to reason about code this way. For example:

When we pass something as an argument of a function, we expect that in the body of the function this argument has that same value we just passed in. Simple enough? Keep reading...

In most programming languages, when we pass an object as an argument of a function, we are actually just passing a *reference* to that object, not its *value*. This doesn't guarantee our initial assumption.

#### For Example

What if our program has 2 different threads, and they both hold a reference to a single object? Let's say this object represents a person with the name *"Alice Appleseed"*. The following can happen:

- Thread **A** calls the function **query_database**, and passes the reference to *"Alice Appleseed"*, in order to get some more data about this person.
- In the middle of function **query_database**, thread **A** get's paused, and thread **B** is started.
- Thread **B** modifies *"Alice Appleseed"* and sets the name of this person to "Bob".
- Thread **A** continues from where it left off, and all the sudden, the name of this person is not *"Alice"* but *"Bob"*.
- The query sent to the database doesn't return any results, because we actually searched for *"Bob Appleseed"* instead of *"Alice Appleseed"*.

I would like to point out some of the things that make this kind of bug a really difficult problem:

- Our code didn't throw any errors, so it most likely passes developer's tests.
- The bug happens only once in a while, because it requires the **query_database** function to be interrupted at a very specific spot. So the code has most probably passed through the QA as well.
- The code works for most of our production users too.
- However, every now and then there is an error, that happens to only some of our clients, and is very hard to reproduce in development.

Having this kind of error will cause some of the frustrated clients to stop using our application.

If we want to avoid this kind of problem, we *must* be able to rely that something else will not change our data without giving any warning.

It turns out that the simplest solutions are always the best, and this is no exception. Making a copy of the data is in fact the best way to keep this guarantee. Thankfully there are [programming languages](http://stackoverflow.com/questions/3137082/programmings-languages-that-are-immutable-by-default) that provide us with mechanisms to do this out of the box.

### Pure Functions

A function simply expresses a **mapping** or a **relation** between the input and the output. As simple or as complex that mapping may be, we should still follow some rules to avoid shooting ourselves in the foot.

There are only two rules about *pure* functions:

1. Given a particular input **twice**, a *pure* function will return the same output **both times**.
2. While figuring out how to return the output, a *pure* function will **never prevent another function from following the first rule.**

In most programming languages these two rules boil down to a single rule:

**A pure function will never change global state.**

This means that you never actually transform any data. You as a programmer just have to *find the relations between different objects, and then write **functions** to express those relations in code.*

### Benefits of Functional Programming

- Knowing that a function will consistently return the same result given the same set of inputs allows you to use and test that function as a [black box](https://en.wikipedia.org/wiki/Black-box_testing).

- Parallelization of your code becomes very simple. Once you know that all you need in order to invoke a function is the parameters you need to pass, then you can run that function on another machine or multiple machines, without having to recreate the global state of the application around it.

- Multithreaded applications never have to deal with the [producer - consumer problem](https://en.wikipedia.org/wiki/Producer–consumer_problem). Instead threads interact by passing messages. Messages can be queued and are by definition non-blocking. The Elixir programming language [takes advantage of this in a big way](http://elixir-lang.org/getting-started/processes.html).

- The code becomes modular and simple to reason about, which improves productivity of the developer team and the reliability of the end product.