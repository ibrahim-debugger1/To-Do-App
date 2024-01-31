async function signIn(db, body) {
  if (!body.emailExistence) {
    return {
      msg: "email is NOt registered",
    };
  }
  return { "Token": body.accessToken };
}

async function signUp(db, body) {
  if (body.emailExistence) {
    return {
      msg: "email is already exist",
    };
  }
  //store data in database
  const data = {
    email: body.email,
    password: body.hashedPassword,
    phone_number: body.phone,
    status: "Active",
  };
  const user = await db.collection("users").insertOne(data);
  return { "Token": body.accessToken };
}

export { signIn, signUp };
