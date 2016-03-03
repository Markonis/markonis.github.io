---
layout: post
title:  "Restful Commander"
date:   2016-02-22 22:32:24 -0500
categories: rest api design-patterns
---
In today's post we will look at how we can avoid some common pitfalls in API
design. The examples will be presented in Ruby on Rails code, but the main takeaways can easily be applied to any decent web framework.

## The Problem

We've all been here: the data model has been designed, and we have the entities and relationships implemented. It is finally time to code up the business logic and we are faced with solving these problems:

- The actions we want to implement on a particular model are not part of the good old CRUD (*Create*, *Read*, *Update*, *Delete*) operations, and we need to make a lot of non-standard controller actions, and routes.

- The actions we want to implement do not belong to a any model, and we have to create a *new* controller just for the "API".

### The Example

Let's consider an application like a website analytics portal. For the sake of simplicity, let's say that we have only 2 models: `Site` and `Visit`. For each `Site` we accumulate information about individual visits. The `Visit` model stores all the usual things like:

- Time of visit
- Browser
- OS
- Current page
- Previous page
- etc.

#### Feature Request

We want to generate various types of reports and visualizations based on the `Visit` data for a particular `Site`. This includes things like: graphs, pie charts, funnel analysis, etc...

Let's try the naive solutions, and see why they are not ideal:

**First thought**: *let's add new actions to the `SitesController`*.

This may sound like a good idea, because essentially we will just take a bunch of `Visits` that `belong_to` a particular `Site` and then draw a graph based on that data.

However, here are some problems with this approach:

- It is not the responsibility of the `SitesController` to know the specifics of drawing various types of graphs.
- The reports we want to generate are likely to change very often, while the standard *CRUD* operations on the `Site` model are very stable. Coupling code that changes frequently with the code that is not expected to change is always a *BAD* idea.

**Second thought**: *let's add a new controller!*

This would decouple the reports generating code from the `SitesController`, which greatly increases the maintainability of our code, and is in line with the [**Single Responsibility Principle**](https://en.wikipedia.org/wiki/Single_responsibility_principle).

But we can still do better, and here are some of the reasons why:

- Adding a new controller just for the API means that we will have many non-standard routes, and soon enough we will end up with a mess no one would dare to change in the future.
- We would have to roll our own validation and error reporting system for each endpoint.
- Testing becomes harder, because all the logic for generating the reports and visualizations is coupled with the code that handles the client requests and sessions, and these two have nothing in common.

### The Solution

The most commonly applied design pattern in this situation is the [**Command**](https://sourcemaking.com/design_patterns/command) pattern. Basically it suggests wrapping each *request* into a separate object - whose responsibility is to handle it.

Let's see how this would look like in our example:

- We introduce a new model called `Report`. It will hold information like:
  - Type of report: `line graph`, `pie chart`...
  - Which properties of the `Visit` object we want to include in the report
  - Date range
  - Particular OS
  - Filtering, sorting
  - ...
- Whenever we want to get a new graph drawn, or analysis performed, we actually issue a `POST` request to the `ReportsController` and simply create a new `Report` object with the passed in parameters.

#### Benefits

- We can implement the logic for generating the reports inside the `Report` model. It just makes sense, when you think about it!
- We can quickly `scaffold` out the views and API endpoints for this.
- We can use the provided validation framework of `ActiveRecord` to make sure that the user is requesting a report that can actually be generated. And provide meaningful error messages otherwise.
- We can extend the reporting capabilities of our application without changing our controllers or routes.
- The `Report` model is not coupled to any other part of the system, so unit testing becomes really easy.
- Every report API request is logged, and we can get usage statistics, reproduce bugs, etc. which is very important, once our code hits production.
