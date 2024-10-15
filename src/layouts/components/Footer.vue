<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import FooterService from '@/services/footer.service';

const workingItem = ref({});
const homeLink = ref(window.location.origin);
const phoneNumber = ref()
const phoneNumberTuyenSinh = ref()
const loadData = async () => {
  const res = await FooterService.getFooter();
  if (res) {
    workingItem.value = res
    phoneNumber.value = [workingItem.value.soDienThoai.slice(0, 3), " ", workingItem.value.soDienThoai.slice(3,7), " ", workingItem.value.soDienThoai.slice(7)].join('');
    phoneNumberTuyenSinh.value = [workingItem.value.soDienThoaiTuyenSinh.slice(0, 3), " ", workingItem.value.soDienThoaiTuyenSinh.slice(3,7), " ", workingItem.value.soDienThoaiTuyenSinh.slice(7)].join('');
    
    
  }
}
onBeforeMount(async () => {
  await loadData()
})

</script>
<template>
  <div class="">
    <div class="footer">
      <VRow no-gutters>
        <VCol
          lg="1"
          cols="12"
        >
          <div class="footer-logo">
            <a href="/">
              <img
              src="../../assets/images/logo/NSPS-logo-01.png"
              alt=""/>
            </a>
          </div>
        </VCol>

        <VCol
          lg="4"
          cols="12"
          class="footer-item"
        >
          <div class="footer-item-right">
            <p>{{ workingItem.tenTruong }}</p>
            <div class="footer-item__description">
              <div class="footer-item__description-icon">
                <img
                  src="../../assets/images/svg/location.svg"
                  alt=""
                >
              </div>
              <a :href= workingItem.viTri target="blank">
                  <div>{{ workingItem.diaChi }}</div>
              </a>
            </div>
            <div class="footer-item__description">
              <div class="footer-item__description-icon">
                <img
                  src="../../assets/images/svg/phone.svg"
                  alt=""
                >
              </div>
              <div><a :href="'callto:' + workingItem.soDienThoai" target="_blank">{{phoneNumber}}</a></div>
            </div>
            <div class="footer-item__description">
              <div class="footer-item__description-icon">
                <img
                  src="../../assets/images/svg/mail.svg"
                  alt=""
                >
              </div>
              <div><a :href="'mailto:' + workingItem.email" target="_blank">{{workingItem.email}}</a></div>
            </div>
          </div>
        </VCol>

        <VCol
          lg="5"
          cols="12"
          class="footer-item"
        >
          <div class="footer-item-right">
            <p> Ban Tuyển Sinh</p>
            <div class="footer-item__description">
              <div class="footer-item__description-icon">
                <img
                  src="../../assets/images/svg/phone.svg"
                  alt=""
                >
              </div>
              <div><a :href="'callto:' + workingItem.soDienThoaiTuyenSinh" target="_blank">{{phoneNumberTuyenSinh}}</a></div>
            </div>
            <div class="footer-item__description">
              <div class="footer-item__description-icon">
                <img
                  src="../../assets/images/svg/mail.svg"
                  alt=""
                >
              </div>
              <div><a :href="'mailto:' + workingItem.emailTuyenSinh" target="_blank">{{workingItem.emailTuyenSinh}}</a></div>
            </div>
          </div>
        </VCol>

        <VCol
          lg="2"
          cols="12"
          class="footer-item"
        >
          <div class="footer-item-right">
            <p>Tuyển Dụng</p>
            <RouterLink :to="{name: 'lien-he'}">
              <p>Liên Hệ</p>
            </RouterLink>
            <div>
              <VRow class="icon-footer">
                <VCol
                  cols="6"
                  class="icon-footer__items"
                >
                  <a :href= workingItem.facebook target="blank">
                    <img
                      src="../../assets/images/svg/facebook.svg"
                      alt=""
                    >
                  </a>
                  <a :href= workingItem.youTube target="blank">
                    <img
                      src="../../assets/images/svg/youtube.svg"
                      alt=""
                    >
                  </a>
                </VCol>
              </VRow>
            </div>
          </div>
        </VCol>
      </VRow>
    </div>
    <p class="footer-copyright">
      Copyright © 2023 www.nsps.edu.vn
    </p>
  </div>
</template>

<style lang="scss" scoped>
.footer-info {
  border-bottom: 1px solid #fff;
  display: flex;
  justify-content: space-between;
}

.footer-logo{
  margin: 0 auto;
  width: 80px;
}

.footer-desc h2 {
  color: #FFF;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 26px;
text-transform: uppercase;
}

.icon-footer {
  display: flex;
  position: relative;
  .icon-footer__items{
    display: flex;
    align-items: center;
  }
}

.icon-footer img {
  margin-right: 15px;
  height: 36px;
}

.footer {
  display: flex;
  margin-top: 40px;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  justify-content: space-around;
}

.footer-logo {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  img{
    width: 100%;
    margin: 5px -12px 0;
  }
}

.footer-item{
  display: flex;
  width: 33%;
  margin-bottom: 51px;
}

.footer-item__description{
  display: flex;
}

.footer-item-right{
  p{
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
}
.footer-item__description-icon{
  margin-right: 10px;
}

.footer-copyright{
  margin-top: 15px;
}
</style>
