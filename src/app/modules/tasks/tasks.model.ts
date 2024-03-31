import { Schema, model } from "mongoose";
import { TTasks, TasksWithStatic } from "./tasks.interface";


// Tasks Schema here
const taskSchema = new Schema<TTasks, TasksWithStatic>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, enum: ['personal', 'official', 'family'] },
        status: { type: String, enum: ['complete', 'incomplete'], default: "complete" },
        isImportant: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false }
    }
);


//Query middle wears to update delete boolean value:

taskSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

taskSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// the single value wont be available by aggregate by /hiding..(aggregate works on pipeline)
taskSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // if not equal = true , don't come
    next();
});

// NEW STATIC METHOD
taskSchema.statics.isTaskExists = async function (title: string): Promise<TTasks | null> {
    const existingUser = await this.findOne({ title });
    return existingUser;
};
const TasksModel = model<TTasks, TasksWithStatic>('task', taskSchema);

export default TasksModel;