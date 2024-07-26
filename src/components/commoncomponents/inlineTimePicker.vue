<template>
    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
        <template v-slot:activator="{ on }">
            <v-text-field v-model="selectedTime" :rules="inputRules" v-on="on" :label="label || 'Select a time'" outlined
                append-icon="mdi-clock-time-four-outline" :required="required || false"
                :hide-details="selectedTime ? true : false" readonly></v-text-field>
        </template>
        <v-sheet color="blue" class="time-picker">
            <v-card-text>
                <v-row align="center" justify="center">
                    <v-col cols="2" class="text-center text-white">
                        <div class="text-center">
                            &nbsp;<v-icon color="white" @click="incrementHour">mdi-chevron-up</v-icon>
                        </div>

                        <div class="text-center">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <button v-bind="attrs" v-on="on" type="button" class="timepicker-hour h3 m-0">
                                        &nbsp;{{ selectedHour }}
                                    </button>
                                </template>
                                <v-list max-height="300px" style="overflow: auto;">
                                    <v-list-item v-for="(item, index) in hours" :key="index"
                                        :disabled="allow_hour > Number(item)" link @click="handleChangeTime(item, 'hour')">
                                        <v-list-item-title>{{ item }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                        <div class="text-center ps-1">
                            &nbsp;<v-icon color="white" @click="decrementHour">
                                mdi-chevron-down
                            </v-icon>
                        </div>
                    </v-col>
                    <span class="text-white text-h4">:</span>
                    <v-col cols="2" class="text-center text-white">
                        <div class="text-center">
                            &nbsp;<v-icon color="white" @click="incrementMinute">
                                mdi-chevron-up
                            </v-icon>
                        </div>
                        <div class="text-center">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <button v-bind="attrs" v-on="on" type="button" class="timepicker-minute h3 m-0">
                                        &nbsp;{{ selectedMinute }}
                                    </button>

                                </template>
                                <v-list max-height="300px" style="overflow: auto;">
                                    <v-list-item v-for="(item, index) in minutes" :key="index"
                                        :disabled="allow_minute > Number(item)" @click="handleChangeTime(item, 'minute')"
                                        link>
                                        <v-list-item-title class="cursor-pointer">{{ item }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>

                        <div class="text-center ps-1">
                            &nbsp;<v-icon color="white" @click="decrementMinute">
                                mdi-chevron-down
                            </v-icon>
                        </div>
                    </v-col>
                    <v-col cols="2" class="text-white pa-0">
                        <button type="button" @click="confirmTime" class="px-2 py-2 rounded-circle h4 m-0">
                            <!-- {{ selectedMinute }} -->
                            OK
                        </button>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-sheet>
    </v-menu>
</template>
  
<script>
export default {
    props: {
        getSelectedTime: Function,
        label: String,
        required: Boolean,
        timeValue: String,
        allow_time: String
    },
    data() {
        return {
            menu: false,
            selectedTime: this.timeValue || null,
            selectedHour: '12',
            selectedMinute: '00',
            hours: Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' + i : i).toString()),
            minutes: Array.from({ length: 4 }, (_, i) => {
                let q = i * 15
                return (q < 10 ? '0' + q : q).toString()
            }),
            periods: ['AM', 'PM'],
            inputRules: [v => !!v || "The field is required"],
            changeField: "",
            timeRule: [
                v => !!v || 'Please enter hours/minutes'
            ],
            allow_hour: "00",
            allow_minute: "00"
        };
    },
    watch: {
        allow_time(newValue) {
            let time = newValue.split(":")
            this.allow_hour = parseInt(time[0])
            this.allow_minute = parseInt(time[1])
        },
        timeValue(newValue) {
            if (newValue !== this.selectedTime) {
                let proptime = newValue.split(":")
                let hour = parseInt(proptime[0])
                let minute = parseInt(proptime[1])
                this.selectedHour = `${hour < 10 ? '0' + hour : hour}`
                this.selectedMinute = `${minute < 10 ? "0" + minute : minute}`
                this.selectedTime = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? "0" + minute : minute}`
            }
        },
        menu(newValue) {
            let checkTime = this.selectedHour + ":" + this.selectedMinute
            if (this.timeValue !== checkTime) {
                let proptime = this.timeValue.split(":")
                this.selectedHour = proptime[0]
                this.selectedMinute = proptime[1]
            }
        }
    },
    methods: {
        handleChangeTime(value, type) {
            if (type === "hour") {
                if(Number(value) >  this.allow_hour){
                    this.allow_minute = 0
                }else{
                    let time = this.allow_time.split(":")
                    this.allow_minute = parseInt(time[1])
                    this.selectedMinute= time[1]
                }
                this.selectedHour = value
            } else {
                this.selectedMinute = value
            }
        },
        incrementHour() {
            const currentIndex = this.hours.indexOf(this.selectedHour);
            if (currentIndex < this.hours.length - 1) {
                this.selectedHour = this.hours[currentIndex + 1];
                this.allow_minute = 0
            }
            if (currentIndex === this.hours.length - 1) {
                const lastIndec = this.hours.indexOf(this.allow_hour < 10 ? '0' + this.allow_hour.toString() : this.allow_hour.toString());
                this.selectedHour = this.hours[lastIndec]
                let time = this.allow_time.split(":")
                this.allow_minute = parseInt(time[1])
                this.selectedMinute = parseInt(time[1])
            }
        },
        decrementHour() {
            const currentIndex = this.hours.indexOf(this.selectedHour);
            if (currentIndex > 0 && this.allow_hour < Number(this.hours[currentIndex])) {
                if (this.allow_hour === Number(this.hours[currentIndex - 1])) {
                    let time = this.allow_time.split(":")
                    this.allow_minute = parseInt(time[1])
                    this.selectedMinute = parseInt(time[1])
                }
                this.selectedHour = this.hours[currentIndex - 1];
            }
            if (currentIndex === 0) {
                this.selectedHour = this.hours[this.hours.length - 1]
            }
        },
        incrementMinute() {
            const currentIndex = this.minutes.indexOf(this.selectedMinute);
            if (currentIndex < this.minutes.length - 1) {
                this.selectedMinute = this.minutes[currentIndex + 1];
            }
            if (currentIndex === this.minutes.length - 1) {
                const lastIndec = this.minutes.indexOf(this.allow_minute < 10 ? '0' + this.allow_minute.toString() : this.allow_minute.toString());
                this.selectedMinute = this.minutes[lastIndec]
            }
        },
        decrementMinute() {
            const currentIndex = this.minutes.indexOf(this.selectedMinute);
            console.log();
            if (currentIndex > 0 && this.allow_minute < Number(this.minutes[currentIndex])) {
                this.selectedMinute = this.minutes[currentIndex - 1];
            } else {
                this.selectedMinute = this.allow_minute < 10 ? "0" + this.allow_minute.toString() : this.allow_minute.toString()
            }
            if (currentIndex === 0) {
                this.selectedMinute = this.minutes[this.minutes.length - 1]
            }
        },
        confirmTime() {
            let time = this.selectedHour + ':' + this.selectedMinute;
            this.selectedTime = time
            this.getSelectedTime(time)
            this.menu = false;
        },
    },
};
</script>
  
<style>
.timepicker-hour,
.timepicker-minute,
.timepicker-period {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
}

.timepicker-hour:focus,
.timepicker-minute:focus,
.timepicker-period:focus {
    outline: none;
}

.v-menu__content .time-picker .v-card {
    min-width: 150px;
    margin-top: 5px;
}

.time-picker .v-card__text {
    padding: 0;
}

.time_period_btn {
    opacity: 0.6;
}

.time_period_btn:focus {
    outline: none;
}

.active_period_btn {
    opacity: 1;
}
</style>