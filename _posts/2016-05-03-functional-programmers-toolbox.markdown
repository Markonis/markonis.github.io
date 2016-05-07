---
layout: post
title:  Functional Programmer's Toolbox
categories: functional programming
---

Hey guys, in the [previous blog post]({% post_url 2016-04-16-intro-to-functional-programming %}) we talked about higher order functions and why they are cool. Now let's take a look at the cool ways we can make use of them to write clean and concise code.

There is only a small number of basic higher order functions, from which all others can be easily created. Some of the most important are those that operate on lists of elements:

- sort
- map
- filter
- reduce
- take
- take while

Let's go through them one by one and see why they are so incredibly useful.

## Sort

The all time classic! The `sort` function takes two arguments:

- A list of things that can be compared
- A function that knows how to compare **two** of those things

The `sort` function is implemented as part of the standard library of most functional programming languages, and what is cool about that is that you never have to think about the sorting algorithm itself, it can be any of the following:

- [Bubble sort](https://en.wikipedia.org/wiki/Bubble_sort){:target="_blank"}
- [Heap sort](https://en.wikipedia.org/wiki/Heapsort){:target="_blank"}
- [Quick sort](https://en.wikipedia.org/wiki/Quicksort){:target="_blank"}
- [Merge sort](https://en.wikipedia.org/wiki/Merge_sort){:target="_blank"}
- ...

You don't care, because the only thing you have to provide is the comparator function, and there you go, you can sort just about anything you have in your application.

#### For Example

Given a list of people like this:

    list = [
      {name: "Bob", age: 25},
      {name: "Alice", age: 27}
    ]

And a comparator function:

    cmp_name(p1, p2) = p1.name <=> p2.name

You can easily sort the people by name:

    sort(list, cmp_name)

And you get:

    [
      {name: "Alice", age: 27},
      {name: "Bob", age: 25}
    ]

## Map

The `map` function takes two arguments:

- A list of things
- A function that takes **one argument**

What it does is that it goes through all the elements of the list, applies the given function to each element, saves the result, and then builds a new list from those results.

#### For Example:

If we have a list of numbers and a function like this:

    list = [1, 2, 3, 4, 5]
    square(x) = x * x

We can apply the map function like so:

    map(list, square)

And we get:

    [1, 4, 9, 16, 25]

The `map` function is very useful, when we want to perform **the same kind of processing** on all the elements of a list. For example:

- In a web app we can have a list of user IDs, and we can map over that list with a query function, to get a list of the actual user records.

- In a navigation app, we can take a list of street addresses, and map over them with a function that returns the geographical coordinates. This way we can display them on the map.

## Filter

The `filter` function takes two arguments:

- A list of things
- A function that takes **one argument** and returns `true` or `false`

What it does is that it takes each element of the list, applies the function to that element and checks the result. Then it builds a new list from those elements for which the function returned `true`.

#### For Example:

If we take the list from the previous example:

    list = [1, 2, 3, 4, 5]

And we define a `test` function like this:

    test(x) = x < 3

When we apply the filter function like so:

    filter(list, test)

We get:

    [1, 2]

The `filter` function can be incredibly useful in situations like this:

- In a todo app we can filter out the items that are marked as *done* and show only the items that are yet to be completed.

- In a movie database app we can choose to display only movies that have rating greater than 9, or only movies that have won the Oscars.

## Reduce

The `reduce` function is special, because unlike the other functions described here, it takes a **list** of things, and returns a **single value**. The arguments for the `reduce` function are:

- A list of things
- A function that takes **two** arguments, and returns **one value**
- The initial value, for example `init`

The `reduce` function is very useful for things like:

- Summing up the elements of a list
- Getting the minimum / maximum element of the list

The arguments for the function you pass to `reduce` are:

- Accumulator
- Current element of the list


The `reduce` function takes the **first** element of the list, for example `a`, and calls the given function like this:

    result = funct(init, a)

Than it takes the **second** element of the list, for example `b`, and calls the given function like this:

    result = funct(result, b)

#### For Example:

If we take a list of numbers:

    list = [1, 2, 3, 4, 5]

And a function like so:

    fn(acc, x) = x + acc

We can call the reduce function like so:

    reduce(list, fn, 0)

The calls to the `fn` will look like this:

1. `fn(list, fn, 0)`
2. `fn(list, fn, 1)`
3. `fn(list, fn, 3)`
4. `fn(list, fn, 6)`

Then the initial call to `reduce` will return `6`.

## Take

Take is a very simple function. It takes two arguments:

- A list of things
- An integer number, for example `n`

It returns a new list, that contains only the **first** `n` elements of the original list.

#### For Example

Let's apply the `take` function to the same list we had before:

    take([1, 2, 3, 4, 5], 3)

We will get:

    [1, 2, 3]

The `take` function is very cool, because in contrast to other higher order functions, it has a **built in counter**. This can be useful for things where we need a specific number of items, for example:

- Pagination
- Processing in pairs / tripplets
- Buffering

## Take While

This is a variation on the `take` function, with an interesting twist. It takes two arguments:

- A list of things
- A function that takes **one** argument and returns `true` or `false`

It simply starts at the first element of the list, and applies the function to that element.

As long as the result is `true`, the elements are added to the resulting list. The **first time** the function returns `false` for a given element, the processing is stopped.

#### For Example

Given a list like before:

    list = [4, 3, 2, 1, 5]

And a function like so:

    test(x) = 5 * x > 13

When we apply the `take_while` function to this list:

    take_while(list, test)

The result is:

    [4, 3]

The `take_while` function is very useful when we are dealing with sorted lists, and we want to get only the elements that meet certain criteria. In this scenario, the `take_while` function will provide better performance than the `filter` function.

## The Benefits

- The [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns){:target="_blank"} is achieved, because your business logic **does not need to know** for example how the sorting algorithm is implemented.

- Once a higher order function is written and tested, it can be reused many times, without any changes, because it is by nature generic.

- The higher order functions we discussed are implemented in the standard library of most programming languages, and the principles of how they work are always the same.

<center><img src="/images/good-job.jpg" style="height: 300px;"></center>