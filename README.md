Pre-DB Segment
--------------
**Use Segment tracking on websites that don't store visitor/user information.**

This code is intended for a website that collects email addresses but no registrations (e.g., passwords, etc.). This includes sites that only subscribe visitors to a newsletter and/or only interact via a "Contact Us" form.

The project requirements that instigated this included:

 - Simplify tracking implementation
 - Use a userId, not email address, as primary key
 - Avoid using a database on email-only website

Segment is useful as a canonical tracker -- a single place to track identity, pageviews, custom events, and more. It works best, though, when a server generates a userId and calls `identify`, ensuring the userId passed through to all connected services.

Here, in lieu of a server-generated userId, we check for a Segment userId in the cookie. If it exists, we use it. If it doesn't, we grab Segment's anonymousId and re-use it as userId. This, along with the other form fields in a simple form, are used in an `identify` call that ensures all connected services get the same userId.

The form itself doesn't actuall post data anywhere. The user data flow through to the other services via the Segment calls.

----------

"Form" embed (this example uses Bootstrap classes)

    <form id="foo">
      <label for="fullname">Full Name</label>
      <input type="text" id="full-name" class="form-control" name="fullname">
    
      <label for="email">Email</label>
      <input type="email" id="email-address" class="form-control" name="email">
    
      <input type="submit" class="btn btn-default" value="Confirm">
    </form>


----------

Somewhere on the page (usually the footer), add your Segment analytics.js.

    <script type="text/javascript">
    [Segment analytics.js goes here]
    </script>

----------

Somewhere below the Segment analytics.js, add segment-identify.js.

    [segment-identify.js goes here]