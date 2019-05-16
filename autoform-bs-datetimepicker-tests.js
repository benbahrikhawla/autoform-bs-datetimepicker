// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by autoform-bs-datetimepicker.js.
import { name as packageName } from "meteor/perfectsofttunisia:autoform-bs-datetimepicker";

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-bs-datetimepicker - example', function (test) {
  test.equal(packageName, "autoform-bs-datetimepicker");
});
