<template>
  <div id="app">
    <a-row :gutter="[4,16]">
      <a-col :span="9">
        <a-input placeholder="请输入任务" :value="initVal" @change="handleInputChange"></a-input>
      </a-col>
      <a-col>
        <a-button type="primary" @click="addHandle">添加事项</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="9">
        <a-list :data-source="infoList" bordered>
          <a-list-item slot="renderItem" slot-scope="item">
            <!-- 复选框 -->
            <a-checkbox
              :checked="item.done"
              @change="(e) => {handleStatusChanged(e, item.id)}"
            >{{ item.info}}</a-checkbox>
            <!-- 删除链接 -->
            <a slot="actions" @click="deteleHandle(item.id)">删除</a>
          </a-list-item>

          <div slot="footer" class="footer">
            <!-- 未完成的任务个数 -->
            <span>{{showDoneNum}}条剩余</span>
            <!-- 按钮操作 -->
            <a-button-group>
              <a-button
                :type="viewKey === 'all' ? 'primary' : 'default'"
                @click="changeList('all')"
              >全部</a-button>
              <a-button
                :type="viewKey === 'unDone' ? 'primary' : 'default'"
                @click="changeList('unDone')"
              >未完成</a-button>
              <a-button
                :type="viewKey === 'done' ? 'primary' : 'default'"
                @click="changeList('done')"
              >已完成</a-button>
            </a-button-group>
            <a @click="removeDoneItem">清除已完成</a>
          </div>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'App',
  data() {
    return {}
  },

  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'initVal', 'viewKey']),
    ...mapGetters(['showDoneNum', 'infoList'])
  },
  components: {},
  methods: {
    //监听 input中的值
    handleInputChange(e) {
      console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    //监听 添加事项 按钮
    addHandle() {
      console.log(this.initVal)
      if (this.initVal.trim().length <= 0) {
        return this.$message.warning('不能为空！')
      }
      this.$store.commit('addItem')
    },
    //监听 删除 按钮
    deteleHandle(id) {
      console.log(id)
      this.$store.commit('deleteItem', id)
    },
    //监听 清除已完成列表项
    removeDoneItem() {
      this.$store.commit('removeDoneItem')
    },
    //监听 选中的状态
    handleStatusChanged(e, id) {
      console.log(e.target.checked)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    //监听 全部
    changeList(key) {
      console.log(key)
      this.$store.commit('changeList', key)
    }
  }
}
</script>

<style>
#app {
  padding: 15px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
