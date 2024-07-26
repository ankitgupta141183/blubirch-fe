<template>
    <v-dialog persistent v-model="dialogDetails.popup"
        :content-class="dialogDetails.dialogType === 'filter' ? dialogDetails.type === 'Pending Disposition' ? 'filter-brandCallLog pending_disposition_filter' :
            'filter-brandCallLog' : dialogDetails.active_tab === 'Pending Decision' ? 'update-brandCallLog w-auto' : 'update-brandCallLog'"
        :max-width="dialogDetails.width || '750px'">
        <v-card class="v-card-100">
            <v-card class="v-card-100" v-if="['update', 'details', 'successAndError'].includes(dialogDetails.dialogType)">
                <v-card-title>
                    <span>{{ dialogDetails.title || "" }}</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="handleClosePopup">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
            <v-form @submit.prevent="handleSubmit"
                v-if="['update', 'filter', 'successAndError'].includes(dialogDetails.dialogType)">
                <v-card-text>
                    <v-container fluid>
                        <template
                            v-if="(dialogDetails.dialogType === 'update') && dialogDetails.active_tab === 'Pending Information'">
                            <v-row v-for="(row, index) in rows" :key="index">
                                <v-col cols="12" sm="5" md="6">
                                    <template v-if="row.element === 'select'">
                                        <v-autocomplete v-model="row.seletedValue" outlined :items="row.options"
                                            @change="(e) => handleChange(e, row)" item-text="label" item-value="field"
                                            label="Select data field" style="max-width: 300px;">
                                            <template v-slot:item="{ item }">
                                                <div>
                                                    {{ item.label }}<span :class="{ 'text-red-500': item.is_mandatory }"> {{
                                                        item.is_mandatory ? ' *' : '' }}</span>
                                                </div>
                                            </template>
                                        </v-autocomplete>
                                    </template>
                                </v-col>
                                <v-col cols="12" sm="5" md="6">
                                    <template v-if="row.inputType === 'file'">
                                        <v-file-input v-model="row.file" :disabled="!row.seletedValue" :accept="row.accept"
                                            :label="row.inputLabel">
                                        </v-file-input>
                                    </template>
                                    <template v-else-if="row.inputType === 'date'">
                                        <v-text-field outlined type="date" :disabled="!row.seletedValue" v-model="row.value"
                                            :label="row.inputLabel">
                                        </v-text-field>
                                    </template>
                                    <template v-else>
                                        <v-text-field v-model="row.value" :disabled="!row.seletedValue"
                                            :label="row.inputLabel" outlined></v-text-field>
                                    </template>
                                </v-col>
                            </v-row>
                        </template>
                        <v-row class="d-flex gap-2 flex-wrap"
                            v-if="(dialogDetails.dialogType === 'update') && dialogDetails.active_tab === 'Pending Decision'">

                            <v-col cols="12" :sm="dialogDetails.fieldData.brand_decision_value === 'Reject' ? '12' : '6'"
                                :md="dialogDetails.fieldData.brand_decision_value === 'Reject' ? '12' : '6'">
                                <v-autocomplete outlined :items="dialogDetails.fieldData.brand_decision_options"
                                    v-model="dialogDetails.fieldData.brand_decision_value" item-text="id" item-value="code"
                                    label="Brand Decision">
                                </v-autocomplete>
                            </v-col>
                            <template v-if="dialogDetails.fieldData.brand_decision_value !== 'Reject'">
                                <template>
                                    <v-col cols="12" sm="5" md="6">
                                        <v-text-field outlined :rules="alphanumericRule"
                                            label="Brand Approval Reference number"
                                            v-model="dialogDetails.fieldData.brand_approval_number_value"></v-text-field>
                                    </v-col>
                                </template>

                                <template v-if="dialogDetails.fieldData.brand_decision_value === 'Discount'">
                                    <v-col cols="12" sm="12" md="12">
                                        <v-sheet>Enter discount percentage/value below.</v-sheet>
                                    </v-col>
                                    <v-col cols="12" sm="5" md="6">
                                        <v-text-field outlined label="Discount Percentage"
                                            @focus="handleDiscount('Discount Percentage')" :rules="numberRule"
                                            @input="(e) => handleChangeDiscount(e, 'Discount Percentage')"
                                            :disabled="dialogDetails.fieldData.discount_percentage_disabled"
                                            v-model.number="dialogDetails.fieldData.discount_percentage_value"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="5" md="6">
                                        <v-text-field :disabled="dialogDetails.fieldData.discount_value_disabled"
                                            :rules="numberRule" v-model.number="dialogDetails.fieldData.discount_value"
                                            outlined @focus="handleDiscount('Discount value')"
                                            @input="(e) => handleChangeDiscount(e, 'Discount value')"
                                            label="Discount Value"></v-text-field>
                                    </v-col>
                                </template>
                                <v-col cols="12" sm="5" md="6"
                                    v-if="dialogDetails.fieldData.brand_decision_value !== 'Discount'">
                                    <v-text-field :rules="alphanumericRule" outlined label="Credit Note Number (Optional)"
                                        v-model="dialogDetails.fieldData.credit_note_number"></v-text-field>
                                </v-col>
                                <template v-if="['RTV', 'Discount'].includes(dialogDetails.fieldData.brand_decision_value)">
                                    <v-col cols="12" sm="5" md="6">
                                        <v-text-field outlined :rules="numbercheck" :patern="[/^[0-9]*$/]"
                                            :label="`Credit Note Amount ${dialogDetails.fieldData.brand_decision_value === 'Discount' ? '(Optional)' : ''}`"
                                            v-model="dialogDetails.fieldData.credit_note_amount"
                                            @input="(value) => handleChangeNamberValue(value)"></v-text-field>
                                        <!-- v-model="dialogDetails.fieldData.credit_note_amount" -->
                                    </v-col>
                                </template>
                                <template v-if="['Repair'].includes(dialogDetails.fieldData.brand_decision_value)">
                                    <v-col cols="12" sm="5" md="6">
                                        <v-combobox :items="dialogDetails.fieldData.repair_type_location_options"
                                            item-text="name" item-value="name" label="Select Location"
                                            v-model="dialogDetails.fieldData.repair_type_location_value"
                                            outlined></v-combobox>
                                    </v-col>
                                </template>

                            </template>
                        </v-row>
                        <v-row
                            v-if="dialogDetails.dialogType === 'update' && dialogDetails.active_tab !== 'Pending Information' && dialogDetails.active_tab !== 'Pending Decision'">
                            <v-col cols="12" :sm="row.col || '5'" :md="row.col || '6'" v-for="(row, index) in rows"
                                :key="index">
                                <template v-if="row.element === 'select'">
                                    <v-autocomplete outlined :label="row.label" :items="row.options" v-model="row.value"
                                        :item-text="row.itemText" :item-value="row.itemValue"></v-autocomplete>
                                </template>
                                <template v-else-if="row.element === 'file'">
                                    <v-file-input :multiple="row.multiple || false" :accept="row.accept" v-model="row.file"
                                        :label="row.label">
                                    </v-file-input>
                                </template>
                                <template v-else-if="row.element === 'date'">
                                    <!-- <v-text-field outlined type="date" v-model="row.value" :label="row.label">
                                    </v-text-field> -->
                                    <v-menu ref="datePopup" v-model="row.datePopup" :close-on-content-click="false"
                                        :return-value.sync="row.value" transition="scale-transition" offset-y
                                        min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field outlined hide-details v-model="row.value" :label="row.label"
                                                prepend-inner-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker :max="row.max" v-model="row.value" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="row.datePopup = false">Cancel</v-btn>
                                            <v-btn text color="primary"
                                                @click="$refs.datePopup[0].save(row.value)">OK</v-btn>
                                            <!-- $refs.datePopup.save(row.value) -->
                                        </v-date-picker>
                                    </v-menu>
                                </template>
                                <template v-else-if="row.element === 'alphanumeric'">
                                    <v-text-field v-model="row.value" :rules="alphanumericRule" :label="row.label" outlined
                                        :readonly="row.readonly || false"></v-text-field>
                                </template>
                                <template v-else>
                                    <v-text-field v-model="row.value" :label="row.label" outlined
                                        :readonly="row.readonly || false"></v-text-field>
                                </template>
                                <!-- {{ renderHtmlTag(row) }} -->
                            </v-col>
                        </v-row>
                        <v-row v-if="dialogDetails.dialogType === 'filter'">
                            <v-col sm="6" md="6" xs="9" cols="12" lg="" v-for="(row, index) in rows" :key="index">
                                <template v-if="row.element === 'select'">
                                    <v-select outlined :label="row.label" :items="row.options" v-model="row.value"
                                        :item-text="row.itemText || 'id'" :item-value="row.itemValue || 'value'"></v-select>
                                </template>
                                <template v-if="row.element === 'search'">
                                    <v-text-field outlined :label="row.label" v-model="row.value"
                                        prepend-inner-icon="mdi-magnify"></v-text-field>
                                </template>
                                <template v-if="row.element === 'select&search'">
                                    <v-autocomplete prepend-inner-icon="mdi-magnify" outlined :label="row.label"
                                        :items="row.options" v-model="row.value" :item-text="row.itemText || 'id'"
                                        style="max-width: 300px;" :item-value="row.itemValue || 'value'"
                                        :multiple="row.multiple || false">
                                    </v-autocomplete>
                                </template>
                                <template v-if="row.element === 'dropdownwithaction'">
                                    <div>
                                        <v-menu v-model="row.nestedDialog" :close-on-content-click="false"
                                            transition="scale-transition" offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-model="row.value" v-on="on" outlined class="w-100 btn-Select-menu btn-text"
                                                    size="large" selected-class="btn-Select-menu" :ripple="false">
                                                    {{ row.label || 'Select....' }}
                                                    <v-icon>mdi-menu-down</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-sheet>
                                                    <v-card-title v-if="row.title">
                                                        <span>{{ row.title }}</span>
                                                    </v-card-title>
                                                    <template v-for="(menuItem, index) in row.menuItems">
                                                        <v-card-text v-if="menuItem.inputTag === 'checkBox'" :key="index"
                                                            class="py-0">
                                                            <v-row>
                                                                <template>
                                                                    <v-col cols="10">{{ menuItem.label }}</v-col>
                                                                    <v-col cols="2" class="text-right">
                                                                        <v-checkbox hide-details class="ma-0"
                                                                            :item-value="menuItem.key" :value="menuItem.key"
                                                                            v-model="menuItem.value"></v-checkbox>
                                                                    </v-col>
                                                                </template>
                                                            </v-row>
                                                        </v-card-text>
                                                        <div v-else-if="menuItem.inputTag === 'number'" class="d-flex mb-2">
                                                            <div class="w-25">
                                                                <div class="d-flex align-items-center h-100 justify-center">
                                                                    {{
                                                                        menuItem.label }}</div>
                                                            </div>
                                                            <div class="w-75 px-2">
                                                                <v-text-field outlined hide-details type="number"
                                                                    :label="menuItem.inputLabel" :rules="numberRule"
                                                                    v-model.number="menuItem.value"
                                                                    class="ma-0"></v-text-field>
                                                            </div>
                                                        </div>
                                                        <v-card-text v-else>
                                                            <v-col cols="4">{{ menuItem.label }}</v-col>
                                                            <v-col cols="8">
                                                                <v-text-field outlined hide-details
                                                                    :label="menuItem.inputLabel" v-model="menuItem.value"
                                                                    class="ma-0"></v-text-field>
                                                            </v-col>
                                                        </v-card-text>
                                                    </template>
                                                    <v-divider thickness="2"></v-divider>
                                                    <v-card-actions class="text-center">
                                                        <v-spacer></v-spacer>
                                                        <v-btn small outlined
                                                            @click="handleNextDialogCancel(row)">Cancel</v-btn>
                                                        <v-spacer></v-spacer>
                                                        <v-btn small color="primary"
                                                            @click="row.nestedDialog = false">Submit</v-btn>
                                                        <v-spacer></v-spacer>
                                                    </v-card-actions>
                                                </v-sheet>
                                            </v-list>

                                        </v-menu>
                                    </div>
                                    <template>
                                        <v-chip class="filterchip text-wrap my-1"
                                            v-for="menuItem in row.menuItems.filter(item => ![undefined, '', false].includes(item.value))"
                                            :key="menuItem.label" color="#fffff" outlined>
                                            <span>{{ menuItem.value }}</span>&nbsp;&nbsp;
                                            <v-icon small @click="handlemenuItemClose(menuItem)"
                                                class="menuItemCloseIcon">mdi-close</v-icon>
                                        </v-chip>&nbsp;
                                    </template>
                                </template>
                                <template v-if="row.element === 'selectwithaction'">
                                    <v-select outlined v-model="row.value" :label="row.label"></v-select>
                                </template>

                            </v-col>
                        </v-row>
                        <v-row v-if="dialogDetails.dialogType === 'successAndError'">
                            <v-col>
                                <v-card-text class="text-center">
                                    <span> {{ dialogDetails.message }}</span>
                                </v-card-text>
                            </v-col>
                        </v-row>

                        <v-row v-if="addColoumns.show">
                            <v-col cols="12">
                                <v-btn outlined class="mb-3" @click="addMoreRows">
                                    <v-icon>mdi-plus</v-icon>
                                    {{ addColoumns.addText }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions center>
                    <v-spacer></v-spacer>
                    <v-btn small text class="btn-cancel mr-2 mb-3" v-if="dialogDetails.closeBtn"
                        @click="handleClosePopup">{{ dialogDetails.closeText }}</v-btn>
                    <v-btn small color="primary" :disabled="disabledSubmitbtn || checkNumber" type="submit" class="mb-3"
                        v-if="dialogDetails.submitBtn">{{
                            dialogDetails.submitText
                        }}</v-btn>

                    <v-spacer v-if="dialogDetails.dialogType !== 'filter'"></v-spacer>

                </v-card-actions>
            </v-form>
            <v-container v-if="['details'].includes(dialogDetails.dialogType)">
                <v-row v-for="(row, index) in rows" :key="index" class="px-2">
                    <template v-if="row.link">
                        <v-col cols="12" sm="5" md="6">
                            {{ row.key }}
                        </v-col>
                        <v-col cols="12" sm="5" md="6">
                            <template v-if="row.value">
                                <a v-if="row.data_type === 'doc'" @click="handleLinkRedirect(row, row.value)"
                                    style="color: #1976d2;">
                                    <u>{{ row.value && row.value.name || "N/A" }}</u>
                                </a>
                                <p v-if="row.data_type !== 'doc'">
                                    {{ row.value }}
                                </p>
                            </template>
                            <template v-else>
                                <a v-if="dialogDetails.active_tab === 'Pending Information'"
                                    @click="handlePopupLinkClick(dialogDetails.data, row)" style="color: #1976d2;">
                                    <u>Update</u>
                                </a>
                                <span v-else>N/A</span>
                            </template>
                        </v-col>
                    </template>
                    <template v-else>
                        <v-col cols="12" sm="5" md="6">
                            {{ row.key }}
                        </v-col>
                        <v-col cols="12" sm="5" md="6">
                            {{ row.value }}
                        </v-col>
                    </template>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
export default {

    props: {
        dialogDetails: Object,
        rows: Array,
        addMoreRows: Function,
        addColoumns: Object,
        handleClosePopup: Function,
        handleSubmit: Function,
        handlePopupLinkClick: Function,
        disabledSubmitButton: Boolean
    },
    data() {
        return {
            overlay: false,
            numberRule: [
                v => /^[0-9]*$/.test(v) || 'Only numbers allowed'
            ],
            alphanumericRule: [
                v => /^[a-zA-Z0-9]*$/.test(v) || 'Only alphanumeric characters are allowed',
            ],
            numbercheck: [
                value => value !== "" || 'Only numbers allowed'
            ],
            checkNumber: false
        }
    },
    computed: {
        disabledSubmitbtn: function () {
            let unfillField = false
            if ((this.dialogDetails.active_tab === 'Pending Decision') && (this.dialogDetails.dialogType === 'update')) {
                let credit_note_number = this.dialogDetails.fieldData.credit_note_number
                let brand_approval_value = this.dialogDetails.fieldData.brand_approval_number_value 
                let brand_approval_field =  brand_approval_value ? !/^[a-zA-Z0-9]*$/.test(brand_approval_value) :  true

                let brand_decision_field = this.dialogDetails.fieldData.brand_decision_value
                let discount_percentage = this.dialogDetails.fieldData.discount_percentage_value
                let discount_value = this.dialogDetails.fieldData.discount_value
                let credit_note_amount = this.dialogDetails.fieldData.credit_note_amount || ""
                let valid_credit_amount = ["RTV"].includes(brand_decision_field) ? credit_note_amount === "" : false
                let location = this.dialogDetails.fieldData.repair_type_location_value || ""
                let repair_type = ["Repair"].includes(brand_decision_field) ? location === "" : false
                let discount_field = ["Discount"].includes(brand_decision_field) ? (discount_percentage === "") && (discount_value === "") : false
                let reject_field = brand_decision_field === "Reject"
                let credit_note_number_field = false
                if (credit_note_number) {
                    if (/^[a-zA-Z0-9]*$/.test(credit_note_number)) {
                        credit_note_number_field = false
                    } else {
                        credit_note_number_field = true
                    }
                } 
                 if (reject_field) {
                    unfillField = false
                } else {
                    unfillField = brand_approval_field || brand_decision_field === "" || discount_field || valid_credit_amount || repair_type || credit_note_number_field
                }
            } else if (this.dialogDetails.dialogType === 'filter') {
                unfillField = false
            } else {
                let unfillValue = this.rows.map(row => row.value || row.file)
                unfillField = unfillValue.includes(undefined)
            }
            return unfillField || this.disabledSubmitButton
        },
    },
    methods: {

        handleChangeNamberValue(value, fieldData) {
            const number = Number(value)
            if (!isNaN(number) && number >= 0) {
                this.numbercheck = [true]
                this.checkNumber = false
            } else {
                this.numbercheck = ['Only numbers allowed']
                this.checkNumber = true
            }
        },
        handleNextDialogCancel(row) {
            row.menuItems = row.menuItems.map(item => ({ ...item, value: "" }))
            row.nestedDialog = false
        },
        handlemenuItemClose(menuItem) {
            menuItem.value = false
        },
        handleChange(value, rowData) {

            if (value && rowData.options) {
                let findOption = rowData.options.find(option => option.field === value)
                rowData.optionData = findOption
                rowData.inputType = findOption && findOption.data_type === "doc" ? "file" : "text"
                rowData.accept = findOption && findOption.data_type === "doc" ? 'application' : ""
            }
        },
        handleLinkRedirect(data, doc) {
            window.open(doc.url, '_blank');
        },
        handleDiscount(type) {
            if (type === "Discount Percentage") {
                this.dialogDetails.fieldData.discount_value_disabled = true
                this.dialogDetails.fieldData.discount_percentage_disabled = false
            } else {
                this.dialogDetails.fieldData.discount_value_disabled = false
                this.dialogDetails.fieldData.discount_percentage_disabled = true
            }
        },
        handleChangeDiscount(value, type) {
            let purchasePrice = this.dialogDetails.fieldData.purchase_price
            if (type === "Discount Percentage") {
                let discount_value = ((purchasePrice * value) / 100)
                this.dialogDetails.fieldData.discount_value = discount_value || ""
                this.dialogDetails.fieldData.discount_value_disabled = true
            } else {
                this.dialogDetails.fieldData.discount_percentage_disabled = true
                this.dialogDetails.fieldData.discount_percentage_value = ((value / purchasePrice) * 100).toFixed(2)
            }
            if (value.length === 0) {
                this.dialogDetails.fieldData.discount_value_disabled = false
                this.dialogDetails.fieldData.discount_percentage_disabled = false
                this.dialogDetails.fieldData.discount_percentage_value = ""
                this.dialogDetails.fieldData.discount_value = ""
            }
        },
    }
}
</script>
<style>
    .btn-text {
        text-transform: capitalize !important;
    }
    .btn-text > .v-btn__content{
        color: rgba(53, 46, 46, 0.6) !important;
    }
</style>