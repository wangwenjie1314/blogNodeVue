<template>
  <div id="app">
    <transition name="el-fade-in" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<style lang="less">
@import "assets/css/core.less";

//element ui reset

//btn
.el-btn-dashed {
  border-style: dashed;
}

.el-table th {
  background: #f2f8fe;
  color: #09638b;
  font-weight: bolder;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f4f9fd; //#f2f8fe;
}

//header
.el-page-header__left {
  &:hover {
    .el-icon-back,
    .el-page-header__title {
      color: #2196f3;
    }
  }
}

//dialog
.el-dialog-gray {
  .el-dialog__body {
    padding: 10px 15px;
    background-color: #f5f7f9;
  }
}
.el-dialog__header {
  color: #17233d;
  font-weight: 500;
  padding: 15px 20px;
}
.el-dialog__body {
  padding: 15px 20px;
}
.el-dialog-zero {
  .el-dialog__body {
    padding: 0;
    overflow: hidden;
  }
}
.el-dialog__close {
  &:hover {
    color: #f00 !important;
  }
}

//imgview
.el-image-viewer__close {
  color: #fff;
  &:hover {
    color: #f00 !important;
  }
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
}

//card
.el-card {
  border-color: transparent;
  &.box-card {
    border-color: #e8ecee;
    .el-card__header {
      background: #f7f8fc;
      color: #254e79;
      font-weight: bold;
    }
  }
}
.el-card + .el-card {
  margin-top: 10px;
}
.el-card__header {
  font-size: 16px;
  color: #17233d;
  font-weight: 500;
  padding: 14px 16px;
}
.el-card__body {
  padding: 20px 10px;
}

//消息通知
.el-notification {
  &.notice-msg {
    cursor: pointer;
    .el-notification__content {
      color: #2196f3;
      &:hover {
        font-weight: bold;
      }
    }
  }
  .el-icon-close {
    &:hover {
      color: #f00;
    }
  }
}

//link
.el-link {
  margin: 0 3px;
}

//form-item
.el-form-item__label {
  font-weight: bolder;
}
.es-form-info {
  background: #fff;
  padding: 10px 15px;
  position: relative;
  &.all {
    min-height: 95vh;
  }
  .el-form-item__content {
    color: #444;
  }
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    line-height: 24px;
  }
}
.el-form-item-block {
  display: block !important;
  .el-form-item__content {
    width: 80%;
    @media (max-width: 1200px) {
      width: 70%;
    }
    @media (max-width: 1000px) {
      width: 65%;
    }
  }
}
.el-form--inline {
  .es-form-items {
    display: flex;
    flex-flow: row wrap;
    .es-form-item {
      display: flex;
      flex: 0 0 33%;
      margin: 5px 0;
      @media (max-width: 1000px) {
        flex: 0 0 50%;
      }
      &.el-form-item-block {
        flex: 0 0 100% !important;
      }
      .el-form-item__content {
        flex: 1;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
}

// textarea
.es-form-item-textarea {
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
}

//头像附件
.avatar-uploader {
  border: 1px dashed #ddd;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  width: 50px;
  height: 50px;
  overflow: hidden;
  img {
    width: 50px;
    height: 50px;
    object-fit: fill;
  }
  &:hover {
    color: #1989fa;
    border-color: #1989fa;
  }
}
</style>
