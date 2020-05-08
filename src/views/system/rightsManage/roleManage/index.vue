<template>
  <div class="role">
    <roleTable></roleTable>
  </div>
</template>
<script>
import RoleTable from "./roleTable";
export default {
  name: "RoleManage",
  components: {
    RoleTable
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.role {
  width: 100%;
}
</style>
