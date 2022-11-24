<template>
  <v-container>
    <v-row class="text-center" outlined>
      <v-col cols="8">
        <v-card
            class="pa-2"
            tile
          >
        <v-row>
      <v-col
          cols="3"
        >
            <p>Total</p>
            <p>{{ getTotal }}</p>
        </v-col>
        <v-col
          cols="3"
        >
            <p>Completed</p>
            <p>{{ getCompleted }}</p>
        </v-col>
        <v-col
          cols="3"
        >
            <p>Not Completed</p>
            <p>{{ getNotCompleted }}</p>
        </v-col>

        <v-col
          cols="3"
        >
            <p>New</p>
            <p>{{ getNew }}</p>
        </v-col>
        </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="text-center note-table">
      <v-col
          cols="12"
        >
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="notes"
        :items-per-page="5"
        class="elevation-1"
        show-select
      >
      </v-data-table>
      </v-col>

      <v-col>
        <v-dialog
          v-model="dialog"
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2 float-right"
              v-bind="attrs"
              v-on="on"
              id="add-btn"
              tile
            >
              Add
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Add Note</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.title"
                      label="Add Title"
                      :rules="titleFieldRule"
                      id="title"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-textarea
                      v-model="editedItem.content"
                      label="Add Content"
                      :rules="contentFieldRule"
                      id="content"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions class="action-btn">
              <!-- <v-spacer></v-spacer> -->
              <v-btn
                color="blue darken-1"
                text
                @click="close"
                id="close-btn"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                @click="save"
                tile
                id="save-btn"
              >
                Save
              </v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row class="footer">
      <v-col
          cols="6"
          v-if="selected.length > 0"
        >
      <v-alert
        type="error"
      >
        <v-row align="center">
          <v-col class="grow">
            Do you want to delete this note?
          </v-col>
          <v-col class="shrink">
            <v-btn @click="cancelDelete" color="error" id="cancel-btn">No</v-btn>
          </v-col>
          <v-col class="shrink">
            <v-btn @click="deleteNote" color="white red--text" id="delete-btn">Yes</v-btn>
          </v-col>
        </v-row>
      </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, ref } from 'vue';
import { noteService } from '../services/services'

  export default {
    name: 'Notes',

    setup(){
      const { getNotes } = noteService();
      const form = ref(null)
      const titleFieldRule = [
        v => !!v || 'Title is required',
      ]
      const contentFieldRule = [
        v => !!v || 'Content is required',
      ]
      const dialog = ref(false)
      const dialogDelete = ref(false)
      const selected = ref([]);

      const editedItem = ref({
        title: '',
        content: ''
      })
      
      const headers = [
          { text: 'ID', value: 'id', class:'grey darken-1' },
          { text: 'Title', value: 'title', class:'grey darken-1' },
          { text: 'Content', value: 'content', class:'grey darken-1' },
          { text: 'Status', value: 'status', class:'grey darken-1' },
        ]
      
      const notes = ref([])

      const resetForm = () => {
        editedItem.value = {
          title: '',
          content: ''
        }
        form.value.reset()
      }

      const close = () => {
        resetForm()
        dialog.value = false
      }

      const save = () => {
        if(!form.value.validate()) return false

        var lastItem = notes.value[notes.value.length-1]
        notes.value.push({
          "id": lastItem.id + 1,
          "title": editedItem.value.title,
          "content": editedItem.value.content,
          "status": "New"
        })

        close()
      }

      const cancelDelete = () => {
        selected.value = []
      }

      const deleteNote = () => {
        selected.value.forEach(a => {
          const index = notes.value.findIndex(item => item.id == a.id)
          return index != -1 ? notes.value.splice(index, 1) : ''
        })

        cancelDelete()
      }

      onMounted(async () => {
        notes.value = await getNotes()
      })

      return {
        headers,
        dialog,
        dialogDelete,
        editedItem,
        notes,
        selected,
        titleFieldRule,
        contentFieldRule,
        form,
        close,
        save,
        cancelDelete,
        deleteNote,
      }
    },

    computed: {
      getTotal(){
        return this.notes.length
      },
      getCompleted(){
        return this.notes.filter(x => x.status === "Completed").length
      },
      getNotCompleted(){
        return this.notes.filter(x => x.status === "Not completed").length
      },
      getNew(){
        return this.notes.filter(x => x.status === "New").length
      }
    }
  }
</script>


<style>
.container {
  margin-top: 20px;
}

thead > tr > th {
  background-color: #757575 !important;
  border-color: #757575 !important;
}

.v-dialog {
  overflow: hidden;
}

.action-btn {
  display: unset;
}
</style>