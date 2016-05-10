---
layout: post
title:  Functional Programmer's Toolbox
categories: functional programming
---

Hey guys, in the [previous blog post]({% post_url 2016-04-16-intro-to-functional-programming %}) we talked about higher order functions and why they are cool. Now let's take a look at the cool ways we can make use of them to write clean and concise code.

There is only a small number of basic higher order functions, from which all others can be easily created. Some of the most important are those that operate on lists of elements:

- [sort](#sort)
- [map](#map)
- [filter](#filter)
- [reduce](#reduce)
- [take while](#take-while)

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

{% capture ruby %}
list = [
  {name: "Bob", age: 25},
  {name: "Alice", age: 27}
]
{% endcapture %}
{% capture javascript %}
var list = [
  {name: "Bob", age: 25},
  {name: "Alice", age: 27}
];
{% endcapture %}
{% include code.html %}

We can sort it like this:

{% capture ruby %}
list.sort do |p1, p2|
  p1.name <=> p2.name
end
{% endcapture %}
{% capture javascript %}
list.sort(function(p1, p2){
  return p1.name.localeCompare(p2.name);
});
{% endcapture %}
{% include code.html %}

And you get:

{% capture ruby %}
[
  {name: "Alice", age: 27},
  {name: "Bob", age: 25}
]
{% endcapture %}
{% capture javascript %}
[
  {name: "Alice", age: 27},
  {name: "Bob", age: 25}
]
{% endcapture %}
{% include code.html %}

## Map

The `map` function takes two arguments:

- A list of things
- A function that takes **one argument**

What it does is that it goes through all the elements of the list, applies the given function to each element, saves the result, and then **returns a new list** from those results.

#### For Example:

If we have a list of numbers and a function like this:

{% capture ruby %}
list = [1, 2, 3, 4, 5]
{% endcapture %}
{% capture javascript %}
var list = [1, 2, 3, 4, 5]
{% endcapture %}
{% include code.html %}

We can get a list of **squares** of the numbers in the list:
{% capture ruby %}
list.map do |num|
  num * num
end
{% endcapture %}
{% capture javascript %}
list.map(function(num){
  return num * num;
});
{% endcapture %}
{% include code.html %}

And we get:
{% highlight ruby %}
[1, 4, 9, 16, 25]
{% endhighlight %}

The `map` function is very useful, when we want to perform **the same kind of processing** on all the elements of a list. For example:

- In a web app we can have a list of user IDs, and we can map over that list with a query function, to get a list of the actual user records.

- In a navigation app, we can take a list of street addresses, and map over them with a function that returns the geographical coordinates. This way we can display them on the map.

## Filter

The `filter` function takes two arguments:

- A list of things
- A function that takes **one argument** and returns `true` or `false`

What it does is that it takes each element of the list, applies the function to that element and checks the result. Then it **returns a new list** from those elements for which the function returned `true`.

#### For Example:

If we take the list from the previous example:

{% capture ruby %}
list = [5, 2, 3, 4, 1]
{% endcapture %}
{% capture javascript %}
var list = [5, 2, 3, 4, 1]
{% endcapture %}
{% include code.html %}

When we apply the filter function like so:

{% capture ruby %}
# In Ruby filter is called select
list.select do |num|
  num < 3
end
{% endcapture %}
{% capture javascript %}
list.filter(function (num) {
  return num < 3;
});
{% endcapture %}
{% include code.html %}

We get:
{% highlight ruby %}
[2, 1]
{% endhighlight %}

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

## Take While

The `take while` function takes **two arguments**:

- A list of things
- A function that takes **one** argument and returns `true` or `false`

It simply starts at the first element of the list, and applies the function to that element.

**As long as the result is** `true`, the elements are added to the resulting list. The **first time** the function returns `false` for a given element, the processing is stopped.

#### For Example

Given a list of numbers:

{% capture ruby %}
list = [5, 3, 2, 4, 1]
{% endcapture %}
{% capture javascript %}
var list = [5, 3, 2, 4, 1]
{% endcapture %}
{% include code.html %}

When we apply the `take_while` function to this list:

{% capture ruby %}
list.take_while do |num|
  num * 5 > 13
end
{% endcapture %}
{% capture javascript %}
// In JavaScript there is no built-in takeWhile function,
// but we can use one from the underscore.js library
_.takeWhile(list, function(num) {
  return 5 * num > 13;
});
{% endcapture %}
{% include code.html %}

And we get:

{% highlight ruby %}
[5, 3]
{% endhighlight %}

The `take while` function is very useful when we are dealing with sorted lists, and we want to get only the elements that meet certain criteria. In this scenario, the `take_while` function will provide better performance than the `filter` function.

## The Benefits

- The **[separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns){:target="_blank"}** is achieved, because, your business logic **does not need to know** any details of how the higher order function is implemented.

- Once a higher order function is written and tested, it **can be reused many times**, without any changes, because it is by nature **generic**.

- The higher order functions we discussed are **implemented in the standard library** of most programming languages, and the principles of how they work are always the same.

<center><img src="/images/good-job.jpg" style="height: 300px;"></center>
