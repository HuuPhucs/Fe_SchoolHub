<script setup lang="ts">
import defaultAvatar from '@images/avatars/default-avatar.png'

const props = defineProps<{
  userInfo?: any
}>()

const statusOnlineAttr = ref({
  dot: true,
  location: "bottom right",
  offsetX: "3",
  offsetY: "3",
  bordered: true,
  color: "success",
})

</script>

<template>
  <!--  Đã đăng nhập-->
  <VBadge v-if="props.userInfo" v-bind="statusOnlineAttr">
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="props.userInfo?.anhDaiDien || defaultAvatar"/>

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VAvatar
                  color="primary"
                  variant="tonal"
                >
                  <VImg :src="props.userInfo?.anhDaiDien || defaultAvatar"/>
                </VAvatar>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              <span v-if="props.userInfo">{{ props.userInfo.hoTen }}</span>
              <span v-else>Khách</span>
            </VListItemTitle>
            <!--            <VListItemSubtitle>Admin</VListItemSubtitle>-->
          </VListItem>

          <VDivider class="my-2"/>

          <template v-if="props.userInfo">

            <!-- 👉 Profile -->
            <VListItem link>
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-user"
                  size="22"
                />
              </template>

              <VListItemTitle>Thông tin tài khoản</VListItemTitle>
            </VListItem>

            <!-- Đổi mật khẩu -->
            <VListItem link>
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-lock-cog"
                  size="22"
                />
              </template>

              <VListItemTitle>Đổi mật khẩu</VListItemTitle>
            </VListItem>

            <!-- Hồ sơ tuyển sinh -->
            <VListItem link>
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file-star"
                  size="22"
                />
              </template>

              <VListItemTitle>Hồ sơ tuyển sinh</VListItemTitle>
            </VListItem>
            <!-- Hồ sơ tuyển dụng -->
            <VListItem link>
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file-cv"
                  size="22"
                />
              </template>

              <VListItemTitle>Hồ sơ tuyển dụng</VListItemTitle>
            </VListItem>

            <!-- Divider -->
            <VDivider class="my-2"/>

            <!-- 👉 Logout -->
            <VListItem to="/login">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-logout"
                  size="22"
                />
              </template>

              <VListItemTitle>Logout</VListItemTitle>
            </VListItem>

          </template>
          <template v-else>
            <VListItem to="/dang-nhap">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-login"
                  size="22"
                />
              </template>

              <VListItemTitle>Đăng nhập/ Đăng ký</VListItemTitle>
            </VListItem>
          </template>

        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>

  <!--  Chưa đăng nhập -->
  <VAvatar v-else
           class="cursor-pointer"
           color="primary"
           variant="tonal"
  >
    <VImg :src="defaultAvatar"/>

    <!-- SECTION Menu -->
    <VMenu
      activator="parent"
      width="240"
      location="bottom end"
      offset="14px"
    >
      <VList>
        <!-- 👉 User Avatar & Name -->
        <VListItem>
          <template #prepend>
            <VListItemAction start>
              <VAvatar
                color="primary"
                variant="tonal"
              >
                <VImg :src="defaultAvatar"/>
              </VAvatar>
            </VListItemAction>
          </template>

          <VListItemTitle class="font-weight-semibold">
            <span>Khách</span>
          </VListItemTitle>
        </VListItem>

        <VDivider class="my-2"/>

        <VListItem to="/dang-nhap">
          <template #prepend>
            <VIcon
              class="me-2"
              icon="tabler-login"
              size="22"
            />
          </template>

          <VListItemTitle>Đăng nhập/ Đăng ký</VListItemTitle>
        </VListItem>

      </VList>
    </VMenu>
    <!-- !SECTION -->
  </VAvatar>


</template>
