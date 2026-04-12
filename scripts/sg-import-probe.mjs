import sgMail from "@sendgrid/mail";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const cjs = require("@sendgrid/mail");

console.log("ESM default === require result:", sgMail === cjs);
console.log("ESM default.setApiKey:", typeof sgMail?.setApiKey);
console.log("require setApiKey same ref:", sgMail.setApiKey === cjs.setApiKey);
