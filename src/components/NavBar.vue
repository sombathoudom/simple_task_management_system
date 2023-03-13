<template>
<nav>

    <v-snackbar v-model="snackbar" top :timeout="4000" color="success">
        <span>Awesome! You added a new project..</span>
        <v-btn plain color="white" @click="snackbar = !snackbar">close</v-btn>
    </v-snackbar>

    <v-toolbar flat>
        <v-app-bar-nav-icon class="grey--text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">Fal</span>
            <span>CoN</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- dropdown -->
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="grey" plain v-bind="attrs" v-on="on">
                 <v-icon left>mdi-chevron-down</v-icon>Menu</v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" router :to="item.route">
                    <v-list-item-title> {{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-btn plain color="grey">
            <span>Sign Out</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-toolbar>

    <v-navigation-drawer class="primary" app temporary v-model="drawer">
        <v-layout column align-center>
            <v-flex class="mt-5">
                <v-avatar size="100">
                    <v-img src="https://www.w3schools.com/w3css/img_avatar3.png"></v-img>
                </v-avatar>
                <p class="white--text subheading mt-1">Chheng Sombathoudom</p>
            </v-flex>
            <v-flex class="mt-4 mb-3">
                <PopUp @closeAlert="snackbar = true"/>
            </v-flex>
        </v-layout>
        <!-- <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="text-h6">
                    Application
                </v-list-item-title>
                <v-list-item-subtitle>
                    subtext
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item> -->
        <v-divider></v-divider>
        <v-list dense nav v-model="group">
            <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</nav>
</template>

<script>
import PopUp from '@/components/PopUp.vue';
export default {
    name: 'NavBar',
    components:{PopUp},
    data() {
        return {
            snackbar:false,
            drawer: false,
            items: [{
                    title: 'Dashboard',
                    icon: 'mdi-view-dashboard',
                    route: '/'
                },
                {
                    title: 'Project',
                    icon: 'mdi-briefcase',
                    route: '/project'
                },
                {
                    title: 'Team',
                    icon: 'mdi-account-group-outline',
                    route: '/team'
                },
            ],
            right: null,
            group: null,
        }
    },
    watch: {
        group() {
            this.drawer = false
        },
    },
}
</script>
