<template>
    <div class="team">
        <v-container class="my-5">
            <h1 class="subheading grey--text mb-10">Team</h1>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
                    <v-card elevation="1" class="text-center ma-3">
                        <v-responsive class="pt-4">
                               <v-avatar size="100" class="grey lighten-2">
                                    <img :src="person.avatar" alt="">
                               </v-avatar>
                        </v-responsive>
                        <v-card-text>
                            <div class="subheading">
                                {{ person.name }}
                            </div>
                            <div class="grey--text">
                                {{ person.role }}
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn plain color="grey">
                                <v-icon small left>mdi-message</v-icon>
                                <span>Message</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    name:"Team-Curd",
    data() {
        return {
            team: [
                {name:'Chheng Sombathoudom', role:"Founder",avatar:"https://www.w3schools.com/w3css/img_avatar3.png"},
                {name:'Kong Rotanak', role:"CEO",avatar:"https://www.w3schools.com/w3css/img_avatar3.png"},
                {name:'Krien Sovanratana', role:"Web Developer",avatar:"https://www.w3schools.com/w3css/img_avatar3.png"},
                {name:'Lim ChhengKhun', role:"Web Developer",avatar:"https://www.w3schools.com/w3css/img_avatar3.png"},

            ]
        }
    }
}

</script>