<template>
  <md-card class="table-demo-page">
    <custom-table v-model="tableData">
      <custom-table-column-group slot="column">
        <custom-table-column width="10%">AAA</custom-table-column>
        <custom-table-column width="40%">testB</custom-table-column>
        <custom-table-column width="auto">CCC</custom-table-column>
      </custom-table-column-group>

      <custom-table-row slot-scope="item" :item="item">
        <custom-table-cell >{{item.c1}}</custom-table-cell>
        <custom-table-cell>{{item.c2}}</custom-table-cell>
        <custom-table-cell>{{item.c3}}</custom-table-cell>
      </custom-table-row>
      <!--<h1 slot="footer">AAAAAAAAAAAAAAAAAAAAA</h1>-->
    </custom-table>
  </md-card>
</template>

<script>
  import CustomTable from "@/components/device_table/CustomTable"
  import CustomTableRow from "@/components/device_table/CustomTableRow"
  import CustomTableCell from "@/components/device_table/CustomTableCell"
  import CustomTableColumn from "@/components/device_table/CustomTableColumn"
  import CustomTableColumnGroup from "@/components/device_table/CustomTableColumnGroup"
  export default {
    name: "table-demo-page",
    components:{
      CustomTable,
      CustomTableRow,
      CustomTableCell,
      CustomTableColumn,
      CustomTableColumnGroup
    },
    data: function(){
      return {
        tableData:[
          {c1:"r1c1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
          {c1:"r1c1",c2:"r1c2",c3:"r1c3"},
          {c1:"r2c1",c2:"r2c2",c3:"r2c3"},
          {c1:"r3c1",c2:"r3c2",c3:"r3c3"},
        ]
      }
    },
    methods:{
      onCellClick:function(item){
      }
    },
  }
</script>

<style lang="sass" scoped>
  .demo-page
    height: 100%
</style>
