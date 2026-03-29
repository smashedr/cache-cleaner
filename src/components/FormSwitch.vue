<script setup lang="ts">
import { isMobile } from '@/utils/system.ts'

const emit = defineEmits(['change'])

const props = defineProps<{
  pk: string
  value: boolean
  label: string
  tooltip: string
  subkey?: string
}>()

// console.log(`FormSwitch.vue: ${props.name}: props.value:`, props.value)

const id = props.subkey ? `${props.subkey}-${props.pk}` : props.pk

function onChange(event: Event) {
  console.log('onChange:', event)
  const target = event.target as HTMLInputElement
  console.log('target:', target)
  console.log('props.pk:', props.pk)
  console.log('target.checked:', target.checked)
  console.log('props.subkey:', props.subkey)
  emit('change', props.pk, target.checked, props.subkey)
}
</script>

<template>
  <div class="form-check form-switch">
    <input :checked="value" :id="id" @change="onChange" class="form-check-input" type="checkbox" role="switch" />
    <label class="form-check-label" :for="id">{{ label }}</label>
    <i v-if="!isMobile" class="fa-solid fa-circle-info ms-2" data-bs-toggle="tooltip" :data-bs-title="tooltip" v-bs></i>
  </div>
</template>
