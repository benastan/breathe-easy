Breathe Easy
============

[![Build Status](https://travis-ci.org/benastan/breathe-easy.png?branch=master)](https://travis-ci.org/benastan/breathe-easy)

An extensible, JavaScript REST client base class.

# Usage

Breathe Easy is a barebones set of objects for constructing RESTful JavaScript web service consumers.

That being said, it also provides an object called `Smoother` that removes much of the boilerplate involved in constructing a client.

## Basic Usage with Smoother

Include `smoother.min.js` and you're good to go. 

Let's say we want to represent GitHub's users api. Start with the client:

    Github = client = Smoother.new('https://api.github.com')
    Github.register('User', function() {
      this.base('users');
      this.member(function() {
        this.setup(function(userId) {
          this.userId = userId;
        });
        this.base(function() {
          return this.userId;
        });
      });
    });
    u = Github.User.new(1);
    u.url();
    => https://api.github.com/users/1
    u.get().done(function(user) { console.log(user.id); });
    => 1825798
