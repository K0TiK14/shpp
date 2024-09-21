// let phone = "+38--  (099) 567 890-1";
// if (phone.length > 25) {
//   return false;
// }
// phone = phone.replace(/[\s-]+/g, "");
// console.log(phone);
// const phoneRegex = /^(\+38)?\(?0\d\d\)?[\d]{7}$/;
// console.log(phoneRegex.test(phone));

function validateEmail(email) {
  const emailRegex =
    /^([a-zA-Z0-9][a-zA-Z0-9-.+]{1,19})@([\w.!$%&’*+/=?^-]{1,15})\.([a-zA-Z]{1,5})$/;
  return emailRegex.test(email);
}

console.log(validateEmail("fi@secondpart.end"));
console.log(validateEmail("first-part@.se=cond%p.art.end"));
console.log(validateEmail("first.part@se=cond%part.r"));

console.log(validateEmail("f@secondart.end,"));
console.log(validateEmail("first-part@.se=cond@part.end"));
console.log(validateEmail("-firstpart@.se=cond%.enddeded"));
console.log(validateEmail("firs_tpart@.se.en"));
console.log(validateEmail(""));
console.log(validateEmail("firstpart@.se.enddeded"));
