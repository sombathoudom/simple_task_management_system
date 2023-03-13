<template>
<div class="dashboard">
    <v-snackbar v-model="snackbar" top :timeout="4000" color="success">
        <span>Awesome! You added a new project..</span>
        <v-btn plain color="white" @click="snackbar = !snackbar">close</v-btn>
    </v-snackbar>
    <v-container class="my-5">

        <h1 class="subheading grey--text mb-10">Dashboard</h1>
        <v-layout row class="mb-3 ml-1 mt-2">
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small plain color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
                        <v-icon left small>mdi-folder</v-icon><span class="caption text-lowercase">By Project</span>
                    </v-btn>
                </template>
                <span>Sort by Title</span>
                <!-- <v-btn small plain color="grey"  @click="sortBy('person')" slot="activator"><v-icon left small>mdi-account</v-icon><span class="caption text-lowercase">By User</span></v-btn>    -->
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small plain color="grey" @click="sortBy('person')" slot="activator" v-bind="attrs" v-on="on">
                        <v-icon left small>mdi-account</v-icon><span class="caption text-lowercase">By User</span>
                    </v-btn>
                </template>
                <span>Sort by Person</span>
            </v-tooltip>

        </v-layout>
        <div v-if="projects.length">
            <v-card class="pa-3" v-for="project in projects" :key="project.id">
                <v-layout row wrap :class="`pa-3 project ${project.status}`">
                    <v-flex xs12 sm12 md4>
                        <div class="caption grey--text">Project Titlle</div>
                        <div>{{project.title}}</div>
                    </v-flex>
                    <v-flex xs6 sm6 md2>
                        <div class="caption grey--text">Person</div>
                        <div>{{project.person}}</div>
                    </v-flex>
                    <v-flex xs6 sm6 md2>
                        <div class="caption grey--text">Due by</div>
                        <div>{{format(new Date(project.due), 'yyyy-MM-dd') }}</div>
                    </v-flex>
                    <v-flex xs6 sm6 md2>
                        <div class="caption grey--text">Status</div>
                        <div>
                            <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
                        </div>
                    </v-flex>
                    <v-flex xs6 sm6 md2>
                        <div class="caption grey--text">Action</div>
                        <div>
                            <PopUpEditProject :data="project" @closeAlert="snackbar = true" />
                            <v-btn plain color="red align-center" @click="handleDeleteProject(project.id)">
                                <v-icon>mdi-trash-can</v-icon>
                            </v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </div>
        <div v-else>
            <v-card class="pa-3">
                <v-layout row wrap class="pa-3">
                    <v-flex xs12 md12>
                        <div class="caption black--text text-center">
                            No data in this document
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </div>

    </v-container>
</div>
</template>

<script>
import {
    format
} from 'date-fns';
import db from '@/firebase';
import {
    doc,
    collection,
    onSnapshot,
    deleteDoc
} from '@firebase/firestore';
import PopUpEditProject from '@/components/PopUpEditProject.vue';
export default {
    name: 'DashBoard',
    components: {
        PopUpEditProject
    },
    data() {
        return {
            projects: [],
            format,
            snackbar: false
        }
    },
    methods: {
        sortBy(props) {
            this.projects.sort((a, b) => a[props] < b[props] ? -1 : 1);
        },
        handleDeleteProject(id) {
            deleteDoc(doc(db, 'projects', id)).then(() => {
                this.snackbar = true;
                this.$router.go(0)
               
            }).catch(error => {
                console.log(error);
            })
        }
    },
    created() {
        onSnapshot(collection(db, 'projects'), rs => {
            const changes = rs.docChanges();
            changes.forEach(element => {
                if (element.type === 'added') {
                    this.projects.push({
                        ...element.doc.data(),
                        id: element.doc.id
                    });
                }
            });
        });

    }

}
</script>

<style scoped>
.project.complete {
    border-left: 4px solid palegreen;
}

.project.ongoing {
    border-left: 4px solid orange;
}

.project.pending {
    border-left: 4px solid #3cd1c2;
}

.project.overdue {
    border-left: 4px solid tomato;
}

.v-chip.complete {
    background-color: palegreen;
}

.v-chip.ongoing {
    background-color: orange;
}

.v-chip.pending {
    background-color: #3cd1c2;
}

.v-chip.overdue {
    background-color: tomato;
}
</style>
