/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shift } from '../types.ts';

export const INITIAL_AVAILABLE_SHIFTS: Shift[] = [
  {
    id: 'shift-olive-ember',
    restaurant: 'Olive & Ember',
    monogram: 'O&E',
    role: 'Официант',
    address: '524 Валенсия-стрит, Сан-Франциско',
    city: 'Сан-Франциско',
    date: '17 октября 2026',
    dateDisplay: 'Сегодня, 17 окт',
    dateISO: '2026-10-17',
    dayOfWeek: 'суббота',
    startTime: '16:00',
    endTime: '22:00',
    timeRange: '16:00 – 22:00 PDT',
    duration: 6,
    durationLabel: '6 часов',
    hourlyRate: 25,
    totalPay: 150,
    distance: '0,8 мили',
    distanceMiles: 0.8,
    status: 'available',
    spotsAvailable: 1,
    imageUrl: '/olive_ember_banner.jpg',
    isDemoRestaurant: true,
    requirements: [
      '6+ месяцев опыта работы официантом',
      'Действующий сертификат California Food Handler',
      'Чёрная рубашка, чёрные брюки, нескользящие туфли'
    ],
    requirementDetails: [
      'Навыки обслуживания гостей и работы с POS-терминалом.',
      'Принесите карту и документ с фотографией.',
      'Приходите за 15 минут до начала; спросите Маю.'
    ],
    instructions: 'Приходите за 15 минут до начала; спросите Маю. Отметьтесь у стойки администратора. Главный вход с Валенсия-стрит.',
    entranceNote: 'Главный вход с Валенсия-стрит. Отметьтесь у стойки администратора.'
  },
  {
    id: 'shift-juniper-kitchen',
    restaurant: 'Juniper Kitchen',
    monogram: 'JK',
    role: 'Повар на линии',
    address: '2101 Мишн-стрит, Сан-Франциско',
    city: 'Сан-Франциско',
    date: '18 октября 2026',
    dateDisplay: 'Завтра, 18 окт',
    dateISO: '2026-10-18',
    dayOfWeek: 'воскресенье',
    startTime: '10:00',
    endTime: '18:00',
    timeRange: '10:00 – 18:00 PDT',
    duration: 8,
    durationLabel: '8 ч',
    hourlyRate: 28,
    totalPay: 224,
    distance: '1,2 мили',
    distanceMiles: 1.2,
    status: 'available',
    spotsAvailable: 1,
    imageUrl: undefined,
    isDemoRestaurant: false,
    requirements: [
      'Роль: Повар на линии.',
      'Дополнительные требования, форма и инструкция к выходу не указаны в описании смены. Уточните их у заведения до начала смены.'
    ],
    requirementDetails: [
      'Приготовление блюд горячего цеха по стандартам заведения.',
      'Наличие актуальной санитарной книжки (Food Handler).'
    ],
    instructions: 'Адрес заведения указан выше. Место встречи уточните перед выходом.',
    entranceNote: 'Служебный вход с Мишн-стрит со стороны парковки.'
  },
  {
    id: 'shift-copper-table',
    restaurant: 'Copper Table',
    monogram: 'CT',
    role: 'Мойщик посуды',
    address: '700 Валенсия-стрит, Сан-Франциско',
    city: 'Сан-Франциско',
    date: '18 октября 2026',
    dateDisplay: 'Завтра, 18 окт',
    dateISO: '2026-10-18',
    dayOfWeek: 'воскресенье',
    startTime: '17:00',
    endTime: '23:00',
    timeRange: '17:00 – 23:00 PDT',
    duration: 6,
    durationLabel: '6 ч',
    hourlyRate: 22,
    totalPay: 132,
    distance: '1,6 мили',
    distanceMiles: 1.6,
    status: 'available',
    spotsAvailable: 1,
    imageUrl: undefined,
    isDemoRestaurant: false,
    requirements: [
      'Нескользящая закрытая обувь',
      'Физическая выносливость и пунктуальность'
    ],
    requirementDetails: [
      'Работа с посудомоечной машиной конвейерного типа.',
      'Фартук и перчатки выдаются на месте.'
    ],
    instructions: 'Вход для персонала через служебную дверь со двора. Спросите су-шефа.',
    entranceNote: 'Служебный вход с 18-й улицы. Звонок домофона «Кухня».'
  }
];

export const INITIAL_HISTORY_SHIFTS: Shift[] = [
  {
    id: 'history-juniper-kitchen',
    restaurant: 'Juniper Kitchen',
    monogram: 'JK',
    role: 'Повар на линии',
    address: '2101 Мишн-стрит, Сан-Франциско',
    city: 'Сан-Франциско',
    date: '18 октября 2026',
    dateDisplay: '18 октября 2026',
    dateISO: '2026-10-18',
    dayOfWeek: 'воскресенье',
    startTime: '10:00',
    endTime: '18:00',
    timeRange: '10:00–18:00 PDT · 8 часов',
    duration: 8,
    durationLabel: '8 ч',
    hourlyRate: 28,
    totalPay: 224,
    distance: '1,2 мили',
    distanceMiles: 1.2,
    status: 'completed',
    spotsAvailable: 0,
    historyNote: 'Пример завершённой смены. Отработанные часы и выплата не подтверждены.',
    requirements: ['Поварской опыт от 1 года'],
    requirementDetails: [],
    instructions: '',
    entranceNote: 'Вход со двора'
  },
  {
    id: 'history-copper-table',
    restaurant: 'Copper Table',
    monogram: 'CT',
    role: 'Мойщик посуды',
    address: '700 Валенсия-стрит, Сан-Франциско',
    city: 'Сан-Франциско',
    date: '18 октября 2026',
    dateDisplay: '18 октября 2026',
    dateISO: '2026-10-18',
    dayOfWeek: 'воскресенье',
    startTime: '17:00',
    endTime: '23:00',
    timeRange: '17:00–23:00 PDT · 6 часов',
    duration: 6,
    durationLabel: '6 ч',
    hourlyRate: 22,
    totalPay: 132,
    distance: '1,6 мили',
    distanceMiles: 1.6,
    status: 'no_show',
    spotsAvailable: 0,
    historyNote: 'Пример смены без выхода. Фактической работы и выплаты не было.',
    requirements: ['Нескользящая обувь'],
    requirementDetails: [],
    instructions: '',
    entranceNote: 'Служебный вход'
  }
];

export const INITIAL_BUSINESS_SHIFTS: Shift[] = [
  {
    id: 'biz-olive-ember-1',
    restaurant: 'Olive & Ember',
    monogram: 'O&E',
    role: 'Официант',
    address: '524 Валенсия-стрит, Сан-Франциско',
    city: 'Сан-Франциско',
    date: '17 октября 2026',
    dateDisplay: '17 октября 2026',
    dateISO: '2026-10-17',
    dayOfWeek: 'суббота',
    startTime: '16:00',
    endTime: '22:00',
    timeRange: '16:00–22:00 PDT · 6 часов',
    duration: 6,
    durationLabel: '6 часов',
    hourlyRate: 25,
    totalPay: 150,
    distance: '0,8 мили',
    distanceMiles: 0.8,
    status: 'available',
    spotsAvailable: 1,
    imageUrl: '/olive_ember_banner.jpg',
    isDemoRestaurant: true,
    requirements: [
      'Опыт официантом от 6 месяцев; California Food Handler; чёрная рубашка и брюки, нескользящие туфли.'
    ],
    requirementDetails: [
      'Один исполнитель на смену. Подтверждение участия обязательно.'
    ],
    instructions: 'Приходите за 15 минут до начала; спросите Маю. Отметьтесь у стойки администратора. Главный вход с Валенсия-стрит.',
    entranceNote: 'Главный вход с Валенсия-стрит.'
  }
];
