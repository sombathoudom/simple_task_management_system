<template>
<v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" dark v-bind="attrs" v-on="on">
            Add a New Project
        </v-btn>
    </template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Add a New Project</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-form ref="form">
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Title" required v-model="title" prepend-icon="mdi-folder" :rules="inputRules.input"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-textarea label="Information" required v-model="content" prepend-icon="mdi-pencil" :rules="inputRules.input"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-select
                                :items="selectOption"
                                label="Status"
                                dense
                                prepend-icon="mdi-chevron-down"
                                :rules="inputRules.select"
                                v-model="defaultSelectedStt"
                               
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-select
                                :items="selectPerson"
                                label="Person"
                                dense
                                prepend-icon="mdi-account-star"
                                :rules="inputRules.select"
                                chips
                                v-model="defaultSelectedPerson"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" label="Select due date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12" class="d-flex justify-end" >
                            <v-btn  color="success" class="mx-0 mt-3" @click="submitForm" :loading="loading">Add Project <v-icon>mdi-check</v-icon></v-btn>
                            <v-btn  color="error" class="mx-1 mt-3" @click="handleClearValidate">Close <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                        
                    </v-row>
                </v-form>
            </v-container>
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
/* eslint-disable */
import {format} from 'date-fns';
import db from '@/firebase';
import { addDoc ,collection} from "firebase/firestore";

export default {
    name: "Create-project",
    data() {
        return {
            dialog: false,
            title: "",
            content: "",
            date: null,
            menu: false,
            inputRules: {
              input: [v => (!!v || v.length >= 3) || 'Mininum length is 3 characters'],
              select: [v => !!v || 'Please choose status']
            },
            loading: false,
            selectOption: ['ongoing','pending','overdue','complete'],
            selectPerson: ['Dom','Yuth','Khun','Na'],
            defaultSelectedStt: 'pending',
            defaultSelectedPerson: null,
        }
    },
    methods: {
        async submitForm() {

            if(this.$refs.form.validate()) {
                this.loading = !this.loading;
                const project = {
                    title: this.title,
                    content: this.content,
                    due: format(new Date(this.date),'yyyy-MM-dd'),
                    person: this.defaultSelectedPerson,
                    status: this.defaultSelectedStt
                }
             
                const setData = await addDoc(collection(db,'projects'),project);
                if(setData) {
                    this.loading = !this.loading;
                    this.$refs.form.reset();
                    this.$emit('closeAlert');
                }
               
            }
        },
        handleClearValidate() {
            this.$refs.form.resetValidation();
            this.dialog = !this.dialog;
        },
      
    },
}
</script>
