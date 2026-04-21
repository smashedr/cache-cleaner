<script setup lang="ts">
import { i18n } from '#imports'
import { onMounted, onUnmounted, ref } from 'vue'
import { type Options, getOptions, saveKeyValue } from '@/utils/options.ts'
import HorizontalRule from '@/components/HorizontalRule.vue'

const bgRef = ref<'bgNone' | 'bgPicture' | 'bgVideo'>('bgNone')
const pictureURL = ref('')
const videoURL = ref('')

function setBackground(options: Options) {
  // NOTE: Copied from VanillaJS. Refactor this method...
  console.log('setBackground:', options.radioBackground)

  bgRef.value = options.radioBackground
  pictureURL.value = options.pictureURL
  videoURL.value = options.videoURL

  // TODO: Use a ref
  const video = document.querySelector('video')
  // TODO: Handle error
  if (!video) return console.warn('no video element')

  if (options.radioBackground === 'bgPicture') {
    const url = options.pictureURL || 'https://picsum.photos/1920/1080'
    document.body.style.background = `url('${url}') no-repeat center fixed`
    document.body.style.backgroundSize = 'cover'
    video.classList.add('d-none')
  } else if (options.radioBackground === 'bgVideo') {
    video.src = options.videoURL
    video.classList.remove('d-none')
    document.body.style.cssText = ''
  } else {
    document.body.style.cssText = ''
    video.classList.add('d-none')
  }
}

async function onChanged(changes: Record<string, any>) {
  // console.log('BackgroundForm.vue - onChanged:', changes)
  const items = changes.options // NOTE: Lazy Typing...
  // console.log('items:', items)
  if (!items?.oldValue || !items?.newValue) return
  if (
    items.oldValue.radioBackground !== items.newValue.radioBackground ||
    items.oldValue.pictureURL !== items.newValue.pictureURL ||
    items.oldValue.videoURL !== items.newValue.videoURL
  ) {
    // console.log('%c Background Option Change Detected.', 'color: LightSkyBlue')
    setBackground(items.newValue)
  }
}

if (!chrome.storage.sync.onChanged.hasListener(onChanged)) {
  chrome.storage.sync.onChanged.addListener(onChanged)
}

onMounted(() => getOptions().then(setBackground).catch(console.warn))
onUnmounted(() => chrome.storage.sync.onChanged.removeListener(onChanged))
</script>

<template>
  <div>
    <HorizontalRule class="my-3">{{ i18n.t('options.optionsBackground') }}</HorizontalRule>
    <form @change="saveKeyValue('radioBackground', bgRef)">
      <div class="d-flex flex-column flex-md-row ms-1 ms-md-3">
        <div class="form-check form-check-inline mb-2 mb-md-0">
          <input
            v-model="bgRef"
            class="form-check-input"
            type="radio"
            name="radioBackground"
            id="bgNone"
            value="bgNone"
          />
          <label class="form-check-label" for="bgNone">
            <i class="fa-regular fa-square"></i> {{ i18n.t('background.none') }}
          </label>
        </div>

        <div class="form-check form-check-inline mb-2 mb-md-0">
          <input
            v-model="bgRef"
            class="form-check-input"
            type="radio"
            name="radioBackground"
            id="bgPicture"
            value="bgPicture"
          />
          <label class="form-check-label" for="bgPicture">
            <i class="fa-regular fa-image"></i> {{ i18n.t('background.picture') }}
          </label>
        </div>

        <div class="form-check form-check-inline mb-2">
          <input
            v-model="bgRef"
            class="form-check-input"
            type="radio"
            name="radioBackground"
            id="bgVideo"
            value="bgVideo"
          />
          <label class="form-check-label" for="bgVideo">
            <i class="fa-solid fa-video"></i> {{ i18n.t('background.video') }}
          </label>
        </div>
      </div>
    </form>

    <div class="ms-0 ms-md-3">
      <div v-if="bgRef === 'bgPicture'" id="bgPictureInput" class="input-group">
        <span
          class="input-group-text"
          id="picture-addon"
          data-bs-toggle="tooltip"
          :data-bs-title="i18n.t('background.pictureTip')"
          v-bs
        >
          <i class="fa-solid fa-circle-info"></i
        ></span>
        <input
          v-model="pictureURL"
          type="text"
          class="form-control"
          :placeholder="i18n.t('background.pictureLabel')"
          :aria-label="i18n.t('background.pictureLabel')"
          id="pictureURL"
          name="pictureURL"
          aria-describedby="picture-addon"
          @change="saveKeyValue('pictureURL', pictureURL)"
        />
      </div>
      <div v-if="bgRef === 'bgVideo'" id="bgVideoInput" class="input-group">
        <span
          class="input-group-text"
          id="video-addon"
          data-bs-toggle="tooltip"
          :data-bs-title="i18n.t('background.videoTip')"
          v-bs
        >
          <i class="fa-solid fa-circle-info"></i
        ></span>
        <input
          v-model="videoURL"
          type="text"
          class="form-control"
          :placeholder="i18n.t('background.videoLabel')"
          :aria-label="i18n.t('background.videoLabel')"
          id="videoURL"
          name="videoURL"
          aria-describedby="video-addon"
          @change="saveKeyValue('videoURL', videoURL)"
        />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <video class="d-none" playsinline autoplay muted loop></video>
  </Teleport>
</template>

<style scoped>
video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
