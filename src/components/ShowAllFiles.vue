<template>
  <div id="app2">
    <h3 class="title">Now in {{titleName}}</h3>
    <Hamburger_menu></Hamburger_menu>
    <button type="button" name="BACK" v-on:click="back()">Go Back</button>
    <button type="button" name="DOWNLOAD" v-on:click="download()">Download</button>
    <button type="button" name="DELETE" v-on:click="filedelete()">Delete</button>
    <button type="button" name="CREATE" v-on:click="create()">CreateNewFile</button>
    <!-- Datatable -->
    <DataTable
        :header-fields="headerFields"
        :sort-field="sortField"
        :sort="sort"
        :data="data || []"
        :is-loading="isLoading"
        :css="datatableCss"
        not-found-msg="Items not found"
        @on-update="dtUpdateSort"
        track-by="FileName"
    >
      <!-- Action button slot -->
      <template v-slot:actions="props">
        <input type="button" class="btn btn-info" value="Edit" @click="dtEditClick(props);">
      </template>
      <!-- Action link slot -->
      <template v-slot:actionFirst="props">
        <a href="#" @click.prevent="actionFirstClick(props)">Actions First</a>
      </template>

      <!-- custom header using boolean -->
      <template v-slot:[createHeaderName]>
        <span>Created Custom</span>
      </template>

      <!-- custom header usgin string -->
      <template v-slot:UpdatedHeader>
        <span>Updated Custom</span>
      </template>

      <!--
        Pagination component as a slot, but could be drag out from Database element
      -->
      <template v-slot:pagination>
        <Pagination
            :page="currentPage"
            :total-items="totalItems"
            :items-per-page="itemsPerPage"
            :css="paginationCss"
            @on-update="changePage"
            @update-current-page="updateCurrentPage"
        />
      </template>

      <!--
        ItemsPerPage component as a slot, but could be drag out from Database element
      -->
      <div class="items-per-page" slot="ItemsPerPage">
        <label>Items per page</label>
        <ItemsPerPageDropdown
            :list-items-per-page="listItemsPerPage"
            :items-per-page="itemsPerPage"
            :css="itemsPerPageCss"
            @on-update="updateItemsPerPage"
        />
      </div>

      <!-- Spinner element as slot used when is-loading attribute is true -->
      <Spinner slot="spinner"/>

      <!-- Custom element for hometown -->
      <div slot="HometownNew" slot-scope="props">
        <input
            type="text"
            :value="props.rowData.hometown"
            @keyup="changeHometown($event, props.rowData.id);"
            class="form-control"
        >
      </div>
    </DataTable>
  </div>
</template>
<style>
#app2 {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #E6E6E6;
  margin-top: 30px;
  margin-left: 130px;
}

#app2 .title {
  margin-bottom: 0px;
}

#app2 .items-per-page {
  height: 100%;
  display: flex;
  align-items: center;
  color: #42b983;
}

#app2 .items-per-page label {
  margin: 0 15px;
}

/* Datatable CSS */
.v-datatable-light .header-item {
  cursor: pointer;
  color: #42b983;
  transition: color 0.15s ease-in-out;
}

.v-datatable-light .header-item:hover {
  color: #ed9b19;
}

.v-datatable-light .header-item.no-sortable {
  cursor: default;
}
.v-datatable-light .header-item.no-sortable:hover {
  color: #337ab7;
}

.v-datatable-light .header-item .th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: bold;
  align-items: baseline;
}

.v-datatable-light .header-item .th-wrapper.checkboxes {
  justify-content: center;
}

.v-datatable-light .header-item .th-wrapper .arrows-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
}

.v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
  justify-content: center;
}

.v-datatable-light .arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}

.v-datatable-light .arrow.up {
  border-bottom: 8px solid #337ab7;
  margin-bottom: 5px;
}

.v-datatable-light .arrow.up:hover {
  border-bottom: 8px solid #ed9b19;
}

.v-datatable-light .arrow.down {
  border-top: 8px solid #337ab7;
}

.v-datatable-light .arrow.down:hover {
  border-top: 8px solid #ed9b19;
}

#app .v-datatable-light .row-7 .column-4 {
  color: steelblue;
}

#app .v-datatable-light .row-1 .column-2 {
  color: green;
}

#app .v-datatable-light .row-2 .column-1 {
  color: red;
}

#app .v-datatable-light .row-3 {
  color: pink;
}

#app .v-datatable-light .column-5 {
  color: goldenrod;
}

#app .v-datatable-light .row-3 .column-5 {
  color: purple;
}

.v-datatable-light .footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}
/* End Datatable CSS */

/* Pagination CSS */
.v-datatable-light-pagination {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: 300px;
  height: 30px;
}

.v-datatable-light-pagination .pagination-item {
  width: 30px;
  margin-right: 5px;
  font-size: 16px;
  transition: color 0.15s ease-in-out;
}

.v-datatable-light-pagination .pagination-item.selected {
  color: #ed9b19;
}

.v-datatable-light-pagination .pagination-item .page-btn {
  background-color: transparent;
  outline: none;
  border: none;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}

.v-datatable-light-pagination .pagination-item .page-btn:hover {
  color: #ed9b19;
}

.v-datatable-light-pagination .pagination-item .page-btn:disabled {
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.65;
}
/* END PAGINATION CSS */

/* ITEMS PER PAGE DROPDOWN CSS */
.item-per-page-dropdown {
  background-color: transparent;
  min-height: 30px;
  border: 1px solid #337ab7;
  border-radius: 5px;
  color: #337ab7;
}
.item-per-page-dropdown:hover {
  cursor: pointer;
}
/* END ITEMS PER PAGE DROPDOWN CSS */
</style>

<script>
import Spinner from "vue-simple-spinner";
import { DataTable, ItemsPerPageDropdown, Pagination } from "v-datatable-light";
import Hamburger_menu from"@/components/hamburger_menu";
import orderBy from "lodash.orderby";

export default {
  name: "app",
  components: {
    DataTable,
    ItemsPerPageDropdown,
    Pagination,
    Spinner,
    Hamburger_menu
  },
  data: function() {
    return {
      titleName:"",
      headerFields: [
        "__slot:checkboxes",
        {
          name: "FileName",
          label: "File Name",
          sortable: true,
        },
        {
          name: "Size",
          label: "Size",
          sortable: true,
        },
        {
          name: "Time",
          label: "LastModifiedTime",
          sortable: true,
        },
        {
          name: "IsDir",
          label: "IsDir",
          sortable: true,
        },
        "__slot:actions",
      ],
      data: [],
      datatableCss: {
        table: "table table-bordered table-hover table-striped table-center",
        theadTh: "header-item",
        thWrapper: "th-wrapper",
        thWrapperCheckboxes: "th-wrapper checkboxes",
        arrowsWrapper: "arrows-wrapper",
        arrowUp: "arrow up",
        arrowDown: "arrow down",
        footer: "footer"
      },
      paginationCss: {
        paginationItem: "pagination-item",
        moveFirstPage: "move-first-page",
        movePreviousPage: "move-previous-page",
        moveNextPage: "move-next-page",
        moveLastPage: "move-last-page",
        pageBtn: "page-btn"
      },
      itemsPerPageCss: {
        select: "item-per-page-dropdown"
      },
      isLoading: false,
      sort: "asc",
      sortField: "FileName",
      listItemsPerPage: [5, 10, 20, 50, 100],
      itemsPerPage: 100,
      currentPage: 1,
      totalItems: 16,
      hometown: null,
      createHeaderName: "created:header"
    };
  },
  created:function () {
    let presentPath = "";
    this.axios.get('/filepath').then(response => {
      presentPath = response.data.presentPath
      if (presentPath !== "") {
        this.$store.commit('SetParentFilePath', presentPath)
        this.titleName = presentPath
        this.axios.get('/fileList',{
          params:{
            "changePathRequest":presentPath
          }
        }).then(response => {
          let FileListData = response.data
          for (var item of FileListData["fileDetails-js"]){
            this.data.push(
                {
                  FileName:item["fileName-js"],
                  Size:item["size-js"],
                  Time:item["lastModiTime-js"],
                  IsDir: item["isDir-js"]
                },
            )
          }
        })
      }
    }).catch(error => {
      console.log(error);
    })
  },
  methods: {
    //dtEditClick: props => alert("Click props:" + JSON.stringify(props)),
    dtEditClick: function (props){
      console.log(props)
      let newFilePath;
      let presentFilePath = this.titleName;
      if (props.rowData.IsDir){
        // push to new filepath
        this.$store.commit('SetParentFilePath', presentFilePath)

        newFilePath = presentFilePath + "/" + props.rowData.FileName
        this.titleName = newFilePath
        this.axios.get('/fileList',{
          params:{
            "changePathRequest": newFilePath
          }
        }).then(response => {
          let FileListData = response.data
          this.data = []
          for (var item of FileListData["fileDetails-js"]){
            this.data.push(
                {
                  FileName:item["fileName-js"],
                  Size:item["size-js"],
                  Time:item["lastModiTime-js"],
                  IsDir: item["isDir-js"]
                },
            )
          }
        })
      } else {
        // push to createfile
        newFilePath = presentFilePath + "/" + props.rowData.FileName

        this.$store.commit('SetAccessFilePath', newFilePath)
        this.$router.push('/createfile')
      }
    },
    dtUpdateSort: function({ sortField, sort }) {
      var initialData = this.data;
      const sortedData = orderBy(initialData, [sortField], [sort]);
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      this.data = sortedData.slice(start, end);
    },

    updateItemsPerPage: function(itemsPerPage) {
      var initialData = this.data;
      this.itemsPerPage = itemsPerPage;
      if (itemsPerPage >= initialData.length) {
        this.data = initialData;
      } else {
        this.data = initialData.slice(0, itemsPerPage);
      }
    },

    changePage: function(currentPage) {
      var initialData = this.data;
      this.currentPage = currentPage;
      const start = (currentPage - 1) * this.itemsPerPage;
      const end = currentPage * this.itemsPerPage;
      this.data = initialData.slice(start, end);
    },

    updateCurrentPage: function(currentPage) {
      this.currentPage = currentPage;
    },

    changeHometown: function(event, id) {
      this.data = this.data.map(item =>
          item.id === id ? { ...item, hometown: event.target.value } : item
      );
    },

    actionFirstClick: params => {
      alert(JSON.stringify(params));
    },

    back(){
      let rootPath = "./userdata/userfiles"
      let parentPath = this.$store.getters.GetParentFilePath
      this.titleName = parentPath
      parentPath = parentPath.substr(0, parentPath.lastIndexOf('/'));
      if (parentPath.length >= rootPath.length){
        this.$store.commit('SetParentFilePath', parentPath)
      }
      this.axios.get('/fileList',{
        params:{
          "changePathRequest": this.titleName
        }
      }).then(response => {
        let FileListData = response.data
        this.data = []
        for (var item of FileListData["fileDetails-js"]){
          this.data.push(
              {
                FileName:item["fileName-js"],
                Size:item["size-js"],
                Time:item["lastModiTime-js"],
                IsDir: item["isDir-js"]
              },
          )
        }
      })
    },
    download(){
      var selectFile = [];
      console.log("download process")
      var cbs = document.getElementsByTagName('input');
      for(var i=0; i < cbs.length; i++) {
        if(cbs[i].type === 'checkbox' && cbs[i].checked === true) {
          var rowIndex = cbs[i].getAttribute("row-index")
          var searchClass = "row-" + rowIndex
          var searchFileName = document.getElementsByClassName(searchClass)[0].getElementsByClassName("column-1")[0].innerText
          selectFile.push(searchFileName)
          console.log(selectFile)
        }
      }
      if (selectFile.length >= 0) {
        this.axios.post('/downloadFile',{
          "Request": selectFile,
          "Path":this.titleName
        })
      }
    },
    filedelete(){
      var selectFile = [];
      console.log("delete process")
      var cbs = document.getElementsByTagName('input');
      for(var i=0; i < cbs.length; i++) {
        if(cbs[i].type === 'checkbox' && cbs[i].checked === true) {
          var rowIndex = cbs[i].getAttribute("row-index")
          var searchClass = "row-" + rowIndex
          var searchFileName = document.getElementsByClassName(searchClass)[0].getElementsByClassName("column-1")[0].innerText
          selectFile.push(searchFileName)
          console.log(selectFile)
        }
      }
      if (selectFile.length >= 0) {
        this.axios.post('/deleteFile',{
            "Request": selectFile,
            "Path":this.titleName
        }).then(response => {
          if (response.data.result){
            this.axios.get('/fileList',{
              params:{
                "changePathRequest": this.titleName
              }
            }).then(response => {
              let FileListData = response.data
              this.data = []
              for (var item of FileListData["fileDetails-js"]){
                this.data.push(
                    {
                      FileName:item["fileName-js"],
                      Size:item["size-js"],
                      Time:item["lastModiTime-js"],
                      IsDir: item["isDir-js"]
                    },
                )
              }
            })
          }
        })
      }
    },
    create(){
      this.$store.commit('SetAccessFilePath', '')
      this.$router.push('/createfile')
    },
    edit(){
    }
  }
};
</script>