<template>
  <div class="container">
    <h2 class="text-center mt-5">My Vue Todo App</h2>

    <!-- Input -->
    <div class="d-flex">
      <input v-model="task" type="text" placeholder="Enter task" class="form-control">
      <button @click="submitTask" class="btn btn-warning rounded-5">SUBMIT</button>
    </div>

    <!-- Get Tasks -->
    <!--
    <div class="d-flex mt-5">
      <button @click="getTasks" class="btn btn-warning rounded-5">Get Tasks</button>
    </div>
    -->
    
    <!-- Task Table -->
    <table class="table table-bordered mt-2">
  <thead>
    <tr>
      <th scope="col">Task</th>
      <th scope="col">Status</th>
      <th scope="col" class="text-center">#</th>
      <th scope="col" class="text-center">#</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(task, index) in tasks" :key="index">
      <td>
        <span :class="{'finished': task.status === 'finished'}">
          {{task.name}}
        </span>
      </td>
      <td style="width: 120px">
        <span @click="changeStatus(index)" class="pointer"
        :class="{'text-danger': task.status === 'to-do',
        'text-warning': task.status === 'in-progress',
        'text-success': task.status === 'finished'}">
          {{firstCharUpper(task.status)}}
        </span>
      </td>
      <td>
        <div class="text-center" @click="editTask(index)">
          <span class="fa fa-pen"></span>
        </div>
      </td>
      <td>
        <div class="text-center" @click="deleteTask(index)">
          <span class="fa fa-trash"></span>
        </div>
      </td>
    </tr>
  </tbody>
</table>

  </div>
</template>

<script>
export default {
  name: 'TodoApp',
  props: {
    msg: String
  },

  data(){
    return {
      editedTask: null,
      availableStatuses: ['to-do', 'in-progress', 'finished'],
      task: '',
      tasks: [
        {
          _id: '',
          name: 'Click "Get Tasks',
          status: ''
        }
      ]
    }
  },

  methods: {
    getTasks(){
      this.axios.get("http://localhost:3000/tasks").then((response) => {
        this.tasks = response.data;
        //console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
    },
    submitTask(){
      if (this.task.length === 0) {
        return;
      }
      if (this.editedTask === null){
      this.axios.post("http://localhost:3000/tasks", {
        name: this.task,
        status: 'to-do'
      })
      .then((response) => {
        console.log(response.data);
        this.getTasks();
      })
      .catch((e) => {
        console.error(e);
      });
      }else{
        let postID = this.tasks[this.editedTask]._id;
        this.axios.patch("http://localhost:3000/tasks" + '/' + postID, {
          name: this.task
        })
        .then((response) => {
          console.log(response.data);
          this.getTasks();
        })
        .catch((e) => {
          console.error(e);
        });
        this.editedTask = null;
      }
      this.task = '';
    },

    deleteTask(index){
      let postID = this.tasks[index]._id;
      this.axios.delete("http://localhost:3000/tasks" + '/' + postID)
      .then((response) => {
      console.log(response.data);
      this.getTasks();
      })
      .catch((e) => {
        console.error(e);
      });
      this.editedTask = null;
    },
    
    editTask(index){
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },

    changeStatus(index){
      let newIndex = this.availableStatuses.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      let postID = this.tasks[index]._id;
      this.axios.patch("http://localhost:3000/tasks" + '/' + postID, {
        status: this.availableStatuses[newIndex]
      })
      .then((response) => {
        console.log(newIndex);
        console.log(response.data);
        this.getTasks();
      })
      .catch((e) => {
        console.error(e);
      });
    },

    firstCharUpper(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  mounted(){
    this.getTasks();
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.finished {
  text-decoration: line-through;
}
</style>
