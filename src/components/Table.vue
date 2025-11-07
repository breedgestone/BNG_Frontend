<template>
    <div>
        <!-- Desktop Table -->
        <div class="hidden sm:block overflow-x-auto bg-white">
            <table class="min-w-full table-auto border border-gray-200">
                <thead>
                    <tr class="bg-gray-50">
                        <th v-for="column in columns" :key="column.key"
                            class="px-4 py-2 text-left text-sm font-semibold text-gray-600 text-nowrap">
                            {{ column.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="data.length" v-for="(row, rowIndex) in data" :key="rowIndex"
                        class="border-gray-500 hover:bg-gray-50"
                        :class="{ 'bg-gray-50': rowIndex % 2 === 1 }">
                        <td v-for="column in columns" :key="column.key" class="px-4 py-2 text-sm text-nowrap">
                            <!-- CHECKBOX SLOT -->
                            <slot v-if="column.key === 'checkbox'" name="checkbox" :row="row" :rowIndex="rowIndex">
                            </slot>

                            <!-- STATUS SLOT (for custom status rendering) -->
                            <slot v-else-if="$slots.status && column.key === 'status'" name="status" :row="row" :rowIndex="rowIndex">
                                <!-- Fallback to default status rendering -->
                                <span :class="statusStyles[row.status] || ''">
                                    {{ row.status }}
                                </span>
                            </slot>

                            <!-- ACTION/ACTIONS SLOT -->
                            <slot v-else-if="(column.key === 'action' || column.key === 'actions') && ($slots.action || $slots.actions)" :name="column.key" :row="row" :rowIndex="rowIndex">
                            </slot>

                            <!-- OTHER CELLS -->
                            <span v-else>
                                {{ row[column.key] }}
                            </span>
                        </td>
                    </tr>
                    <tr v-else>
                        <td colspan="100%">
                            <EmptyState />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Mobile Card View -->
        <div class="block sm:hidden space-y-4">
            <div v-if="data.length">
                <div v-for="(row, rowIndex) in data" :key="'card-' + rowIndex"
                    class="bg-white shadow rounded-lg p-4 space-y-4 relative">
                    <!-- Loop through columns in pairs -->
                    <div v-for="(colPair, i) in Math.ceil(columns.length / 2)" :key="i"
                        class="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
                        <!-- First col -->
                        <div v-if="columns[i * 2]" class="text-sm">
                            <div class="font-semibold text-gray-600">
                                <p>{{ columns[i * 2].label }}</p>
                            </div>
                            <div class="mt-1 text-xs break-words" :class="(columns[i * 2].key === 'action' || columns[i * 2].key === 'actions') ? 'overflow-visible' : 'overflow-hidden'">
                                <span v-if="columns[i * 2].key === 'status'" :class="statusStyles[row.status] || ''">
                                    {{ row.status }}
                                </span>
                                <slot v-else-if="columns[i * 2].key === 'action' || columns[i * 2].key === 'actions'" :name="columns[i * 2].key" :row="row"
                                    :rowIndex="rowIndex"></slot>
                                <span v-else class="break-words">
                                    {{ row[columns[i * 2].key] }}
                                </span>
                            </div>
                        </div>

                        <!-- Second col (if exists) -->
                        <div v-if="columns[i * 2 + 1]" class="text-sm">
                            <div class="font-semibold text-gray-600">
                                {{ columns[i * 2 + 1].label }}
                            </div>
                            <div class="mt-1 text-xs break-words" :class="(columns[i * 2 + 1].key === 'action' || columns[i * 2 + 1].key === 'actions') ? 'overflow-visible' : 'overflow-hidden'">
                                <span v-if="columns[i * 2 + 1].key === 'status'" :class="statusStyles[row.status] || ''">
                                    {{ row.status }}
                                </span>
                                <slot v-else-if="columns[i * 2 + 1].key === 'action' || columns[i * 2 + 1].key === 'actions'" :name="columns[i * 2 + 1].key" :row="row"
                                    :rowIndex="rowIndex"></slot>
                                <span v-else class="break-words">
                                    {{ row[columns[i * 2 + 1].key] }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <EmptyState />
            </div>
        </div>
    </div>
</template>

<script setup>
import EmptyState from '@/components/EmptyState.vue'

defineProps({
    data: { type: Array, required: true },
    columns: { type: Array, required: true },
    statusStyles: { type: Object, default: () => ({}) },
});
</script>

<style scoped>
.table-container {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 12px;
    text-align: left;
}

th {
    background-color: #F4F6F9;
    color: var(--color-gray-900);
    font-weight: 600;
    line-height: 30px;
}

th:first-child {
    border-top-left-radius: 10px;
}

th:last-child {
    border-top-right-radius: 10px;
}

td {
    border-bottom: 1px solid var(--color-gray-200);
    color: var(--color-gray-600);
    font-weight: 400;
    line-height: 24px;
    padding: 20px 12px;
}
</style>
