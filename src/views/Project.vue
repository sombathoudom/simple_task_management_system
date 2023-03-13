<template>
<div class="project">
    <v-container class="my-5">
        <h1 class="subheading grey--text mb-10">Project</h1>
        <v-expansion-panels>
            <v-expansion-panel v-for="project in ownProject" :key="project.title">
                <v-expansion-panel-header>
                   {{project.title}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                   <span class="px-4 grey--text"> {{format(new Date(project.due), 'yyyy-MM-dd') }}</span> <v-spacer></v-spacer>
                    {{ project.content }}
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</div>
</template>

<script>
import { format } from 'date-fns';
import db from '@/firebase';
import { collection, onSnapshot } from '@firebase/firestore';
export default {
    name: "Project-crud",
    data() {
        return {
            projects: [],
            format,
        }
    },
    computed: {
      ownProject() {
        return this.projects.filter(project => {return project.person ==="Dom"});
      }
    },
    created() {
        onSnapshot(collection(db,'projects'), rs => {
            const changes = rs.docChanges();
            changes.forEach(element => {
                if(element.type === 'added') {
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
