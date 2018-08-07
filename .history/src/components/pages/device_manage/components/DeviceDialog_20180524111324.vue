<template>
    <div>
        <md-dialog :md-active.sync="showDialog" class="device-dialog-con">
            <md-dialog-title>{{deviceDialogTitle}}</md-dialog-title>
            <md-content>
                <md-field>
                    <md-select v-model="movie" name="movie" id="movie">
                        <md-option value="fight-club">Fight Club</md-option>
                        <md-option value="godfather">Godfather</md-option>
                        <md-option value="godfather-ii">Godfather II</md-option>
                        <md-option value="godfather-iii">Godfather III</md-option>
                        <md-option value="godfellas">Godfellas</md-option>
                        <md-option value="pulp-fiction">Pulp Fiction</md-option>
                        <md-option value="scarface">Scarface</md-option>
                    </md-select>
                </md-field>
            </md-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="deviceDialogClose">关闭</md-button>
                <md-button class="md-primary" @click="deviceDialogSave">保存</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
