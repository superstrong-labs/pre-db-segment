<script type="text/javascript">
  $("#foo").submit(function (event) {

  // Stop the form from submitting.
  event.preventDefault();

  // If a Segment userId exists, use it. If it doesn't, use the Segment anonymousId as the userId.
  var segmentId = analytics.user().id();
  var anonymousId = analytics.user().anonymousId();
  if (segmentId === null) {
      var userid = anonymousId;
  } else {
      var userid = segmentId;
  }
  var email = document.getElementById('email-address').value;
  var fullname = document.getElementById('full-name').value;

  // Run Segment's identify and track calls.
  analytics.identify(userid, {
      name: fullname,
      email: email
  });
  analytics.track('Made Contact', {
      source: 'Website Form'
  });

  // Hide the contents of the form area and replace with a success message.
  // In this example, #modal-form holds the initial form area, #modal-success is hidden by default.
  document.getElementById("modal-form").style.display = "none";
  document.getElementById("modal-success").style.display = "block";

  return false;
  });
</script>