import { ObjectId } from "mongodb";

async function getAllTasks(db) {
  const posts = await db.collection("posts").find().toArray();
  return posts;
}

async function getTask(db, id) {
  const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });
  if (post == null) {
    return "the task is not exist";
  }
  return post;
}

async function createTask(db, body) {
  if (body.body == null || body.body === "undefined") {
    return "enter the task body please...";
  }
  const post = await db.collection("posts").insertOne(body);
  return post;
}

async function updateTask(db, body) {
  if (body.body == null || body.body === "undefined") {
    return "enter the task body please...";
  }
  const check_task_existence = await get_task(db, body.id);
  if (check_task_existence === "the task is not exist") {
    return "the task is not exist";
  }
  let filter = { _id: new ObjectId(body.id) };
  let newValues = {
    $set: { body: body.body, status: body.status, modifiedDate: new Date() },
  };
  const post = await db.collection("posts").updateOne(filter, newValues);

  return { status: "updated successfully" };
}

async function deleteTask(db, id) {
  const check_task_existence = await get_task(db, id);
  if (check_task_existence === "the task is not exist") {
    return "the task is not exist";
  }
  const post = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(id) });
  return post;
}

export { getAllTasks, getTask, createTask, updateTask, deleteTask };
