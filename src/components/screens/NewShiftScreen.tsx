/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shift, PublishShiftForm } from '../../types.ts';
import { Button } from '../common/Button.tsx';
import { NoticeBlock } from '../common/NoticeBlock.tsx';
import { Badge } from '../common/Badge.tsx';
import { ArrowLeft, Check, Calendar, Clock, MapPin, DollarSign, AlertCircle } from 'lucide-react';

interface NewShiftScreenProps {
  onPublishSuccess: (newShift: Shift) => void;
  onNavigateToBusinessShifts: () => void;
  initialValues?: Partial<PublishShiftForm>;
  isEditing?: boolean;
}

export const NewShiftScreen: React.FC<NewShiftScreenProps> = ({
  onPublishSuccess,
  onNavigateToBusinessShifts,
  initialValues,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<PublishShiftForm>({
    restaurant: initialValues?.restaurant || 'Olive & Ember',
    role: initialValues?.role || 'Официант',
    date: initialValues?.date || '17 октября 2026',
    timeRange: initialValues?.timeRange || '16:00–22:00',
    startTime: initialValues?.startTime || '16:00',
    endTime: initialValues?.endTime || '22:00',
    duration: initialValues?.duration || 6,
    hourlyRate: initialValues?.hourlyRate || 25,
    city: initialValues?.city || 'Сан-Франциско',
    address: initialValues?.address || '524 Валенсия-стрит',
    requirements: initialValues?.requirements || 'Опыт официантом от 6 месяцев; California Food Handler; чёрная рубашка и брюки, нескользящие туфли.',
    instructions: initialValues?.instructions || 'Приходите за 15 минут до начала; спросите Маю. Отметьтесь у стойки администратора.',
  });

  const [step, setStep] = useState<'form' | 'preview' | 'publishing' | 'success'>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPay = formData.hourlyRate * formData.duration;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.restaurant.trim()) newErrors.restaurant = 'Укажите заведение';
    if (!formData.role.trim() || formData.role === 'none') newErrors.role = 'Выберите роль исполнителя';
    if (!formData.address.trim()) newErrors.address = 'Укажите адрес места работы';
    if (formData.hourlyRate <= 0) newErrors.hourlyRate = 'Укажите ставку больше $0';
    if (!formData.requirements.trim()) newErrors.requirements = 'Укажите требования к исполнителю';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoToPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep('preview');
    }
  };

  const handlePublish = () => {
    setStep('publishing');
    // Simulated publish process with exact 2s animation from spec
    setTimeout(() => {
      const createdShift: Shift = {
        id: `biz-shift-${Date.now()}`,
        restaurant: formData.restaurant,
        monogram: formData.restaurant.split(' ').map((w) => w[0]).join('').slice(0, 3).toUpperCase() || 'RES',
        role: formData.role,
        address: `${formData.address}, ${formData.city}`,
        city: formData.city,
        date: formData.date,
        dateDisplay: '17 октября 2026',
        dateISO: '2026-10-17',
        dayOfWeek: 'суббота',
        startTime: formData.startTime,
        endTime: formData.endTime,
        timeRange: `${formData.startTime}–${formData.endTime} PDT · ${formData.duration} часов`,
        duration: formData.duration,
        durationLabel: `${formData.duration} часов`,
        hourlyRate: formData.hourlyRate,
        totalPay: totalPay,
        distance: '0,8 мили',
        distanceMiles: 0.8,
        status: 'available',
        spotsAvailable: 1,
        imageUrl: '/olive_ember_banner.jpg',
        isDemoRestaurant: true,
        requirements: [formData.requirements],
        requirementDetails: ['Один исполнитель на смену.'],
        instructions: formData.instructions,
        entranceNote: 'Главный вход с Валенсия-стрит.',
      };

      onPublishSuccess(createdShift);
      setStep('success');
    }, 2000);
  };

  // Preview Step
  if (step === 'preview') {
    return (
      <div className="w-full flex flex-col flex-1 pb-8">
        <div className="h-14 px-4 bg-white sticky top-0 z-20 border-b border-[#DFE2E5] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep('form')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#202326]"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h2 className="text-[17px] font-bold text-[#202326]">
            Предпросмотр
          </h2>
          <div className="w-10" />
        </div>

        <div className="px-5 pt-4 space-y-4">
          <NoticeBlock
            variant="warning"
            title="Проверьте перед публикацией"
            description="Проверьте оплату, дату, адрес и требования перед публикацией."
          />

          {/* Shift Preview Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#DFE2E5] shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="dark">Предпросмотр</Badge>
                <h3 className="text-[20px] font-bold text-[#202326] mt-2">
                  {formData.restaurant}
                </h3>
                <p className="text-[14px] text-[#626970] font-medium">
                  {formData.role} · 1 исполнитель
                </p>
              </div>
              <Badge variant="info">РЕСТОРАН</Badge>
            </div>

            {/* Pay block */}
            <div className="bg-[#FFF8E7] rounded-xl p-3.5 border border-[#FFE399]">
              <span className="text-[28px] font-bold text-[#202326]">
                ${totalPay}
              </span>
              <p className="text-[13px] text-[#737980]">
                ${formData.hourlyRate}/ч × {formData.duration} ч · до налогов
              </p>
              <p className="text-[11px] text-[#737980] mt-0.5">
                Чаевые не включены. Базовая оплата, оценка.
              </p>
            </div>

            {/* Schedule & Location */}
            <div className="space-y-2 text-[13px] text-[#4A5157]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#737980]" />
                <span className="font-semibold text-[#202326]">{formData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#737980]" />
                <span>{formData.timeRange} PDT · {formData.duration} часов</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#737980]" />
                <span>{formData.address}, {formData.city}</span>
              </div>
            </div>

            {/* Requirements preview */}
            <div className="pt-2 border-t border-[#DFE2E5] space-y-1.5">
              <span className="text-[12px] font-bold text-[#202326] uppercase tracking-wider block">
                Требования
              </span>
              <p className="text-[13px] text-[#4A5157] leading-relaxed">
                {formData.requirements}
              </p>
            </div>

            {/* Instructions preview */}
            {formData.instructions && (
              <div className="pt-2 border-t border-[#DFE2E5] space-y-1.5">
                <span className="text-[12px] font-bold text-[#202326] uppercase tracking-wider block">
                  Инструкция к выходу
                </span>
                <p className="text-[13px] text-[#4A5157] leading-relaxed">
                  {formData.instructions}
                </p>
              </div>
            )}
          </div>

          <p className="text-[12px] text-[#737980]">
            Все условия будут видны исполнителю до принятия смены. Сумма указана до налогов, без чаевых.
          </p>

          <div className="space-y-2 pt-2">
            <Button variant="primary" onClick={handlePublish}>
              Опубликовать
            </Button>
            <Button variant="secondary" onClick={() => setStep('form')}>
              Вернуться к форме
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Publishing Animation Step
  if (step === 'publishing') {
    return (
      <div className="w-full flex flex-col flex-1 items-center justify-center p-6 text-center space-y-5 my-auto">
        <div className="w-16 h-16 rounded-full bg-[#FFF4D6] text-[#986300] flex items-center justify-center animate-pulse">
          <Clock className="w-8 h-8 animate-spin" />
        </div>
        <div>
          <h2 className="text-[22px] font-bold text-[#202326]">
            Публикуем смену…
          </h2>
          <p className="text-[14px] text-[#626970] mt-1.5 max-w-[280px] mx-auto">
            Пожалуйста, подождите. Повторная отправка недоступна.
          </p>
        </div>
      </div>
    );
  }

  // Success Step
  if (step === 'success') {
    return (
      <div className="w-full flex flex-col flex-1 pb-8">
        <div className="px-5 pt-6 space-y-4">
          <NoticeBlock
            variant="success"
            title="Смена опубликована"
            description="Смена доступна исполнителям. Управляйте условиями в разделе «Мои смены»."
          />

          <div className="bg-white rounded-2xl p-5 border border-[#DFE2E5] space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="info" dot>Опубликована</Badge>
              <span className="text-[12px] font-bold text-[#737980]">РЕСТОРАН</span>
            </div>

            <h3 className="text-[20px] font-bold text-[#202326]">
              {formData.restaurant}
            </h3>
            <p className="text-[14px] text-[#626970]">
              {formData.role} · 1 исполнитель
            </p>

            <div className="bg-[#F9FAFB] p-3 rounded-xl border border-[#DFE2E5] space-y-1 text-[13px]">
              <div className="font-bold text-[#202326]">${totalPay} (${formData.hourlyRate}/ч × {formData.duration} ч)</div>
              <div className="text-[#626970]">{formData.date} · {formData.timeRange} PDT</div>
              <div className="text-[#626970]">{formData.address}, {formData.city}</div>
            </div>

            <div className="pt-2 text-[13px] text-[#4A5157]">
              <span className="font-bold text-[#202326] block">Что дальше</span>
              <p className="text-[12px] text-[#626970] mt-0.5">
                Следите за откликами в разделе «Смены бизнеса» и уточняйте условия до начала работы.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button variant="primary" onClick={onNavigateToBusinessShifts}>
              К сменам бизнеса
            </Button>
            <Button variant="secondary" onClick={() => setStep('form')}>
              Создать ещё смену
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Form Step
  return (
    <div className="w-full flex flex-col flex-1 pb-8">
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <h1 className="text-[28px] font-bold text-[#202326] tracking-tight">
          {isEditing ? 'Редактировать смену' : 'Опубликовать смену'}
        </h1>
        <p className="text-[14px] text-[#626970] mt-1">
          {isEditing ? 'Обновите условия и сохраните изменения.' : 'Публикация смены для исполнителей.'}
        </p>
      </div>

      <div className="px-5 space-y-4">
        {/* Notice block */}
        <NoticeBlock
          variant="warning"
          title="Бизнес · деморежим"
          description="Все поля заполнены для примера. Публикация не отправляет данные и не создаёт реальную смену."
        />

        {Object.keys(errors).length > 0 && (
          <div className="bg-[#FDEDED] rounded-2xl p-4 border border-[#F8C8C8] flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#BF3636] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[14px] font-bold text-[#BF3636]">
                Проверьте обязательные поля
              </h4>
              <p className="text-[12px] text-[#4A5157] mt-0.5">
                Заполните все отмеченные поля. Введённые данные сохранены.
              </p>
            </div>
          </div>
        )}

        <p className="text-[12px] text-[#737980]">
          * Обязательные поля. Валюта — USD; время местное, PDT.
        </p>

        {/* Section: Кого вы ищете */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-3.5">
          <h3 className="text-[15px] font-bold text-[#202326]">
            Кого вы ищете
          </h3>

          {/* Restaurant Field */}
          <div>
            <label className="text-[13px] font-semibold text-[#202326] block mb-1">
              Заведение *
            </label>
            <input
              type="text"
              value={formData.restaurant}
              onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
              className={`w-full h-11 px-3.5 rounded-xl border text-[15px] text-[#202326] outline-none focus:ring-2 focus:ring-[#FFBE24] transition-all ${
                errors.restaurant ? 'border-[#BF3636] bg-[#FDEDED]/20' : 'border-[#DFE2E5]'
              }`}
            />
            <p className="text-[11px] text-[#737980] mt-1">
              Название увидят исполнители
            </p>
          </div>

          {/* Role Field */}
          <div>
            <label className="text-[13px] font-semibold text-[#202326] block mb-1">
              Роль *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={`w-full h-11 px-3.5 rounded-xl border text-[15px] text-[#202326] bg-white outline-none focus:ring-2 focus:ring-[#FFBE24] transition-all ${
                errors.role ? 'border-[#BF3636]' : 'border-[#DFE2E5]'
              }`}
            >
              <option value="Официант">Официант</option>
              <option value="Повар на линии">Повар на линии</option>
              <option value="Мойщик посуды">Мойщик посуды</option>
              <option value="Бариста">Бариста</option>
              <option value="Бармен">Бармен</option>
            </select>
            <p className="text-[11px] text-[#737980] mt-1">
              Один исполнитель на смену
            </p>
          </div>
        </div>

        {/* Section: Дата и время */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-3.5">
          <h3 className="text-[15px] font-bold text-[#202326]">
            Дата и время
          </h3>

          <div>
            <label className="text-[13px] font-semibold text-[#202326] block mb-1">
              Дата смены *
            </label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full h-11 px-3.5 rounded-xl border border-[#DFE2E5] text-[15px] text-[#202326] outline-none focus:ring-2 focus:ring-[#FFBE24]"
            />
            <p className="text-[11px] text-[#737980] mt-1">Дата смены</p>
          </div>

          <div>
            <label className="text-[13px] font-semibold text-[#202326] block mb-1">
              Начало и конец *
            </label>
            <input
              type="text"
              value={formData.timeRange}
              onChange={(e) => setFormData({ ...formData, timeRange: e.target.value })}
              className="w-full h-11 px-3.5 rounded-xl border border-[#DFE2E5] text-[15px] text-[#202326] outline-none focus:ring-2 focus:ring-[#FFBE24]"
            />
            <p className="text-[11px] text-[#737980] mt-1">
              PDT · Сан-Франциско · длительность {formData.duration} ч
            </p>
          </div>
        </div>

        {/* Section: Оплата */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-3.5">
          <h3 className="text-[15px] font-bold text-[#202326]">
            Оплата
          </h3>

          <div>
            <label className="text-[13px] font-semibold text-[#202326] block mb-1">
              Ставка за час, USD *
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) || 0 })}
                className={`w-full h-11 pl-8 pr-4 rounded-xl border text-[15px] text-[#202326] outline-none focus:ring-2 focus:ring-[#FFBE24] ${
                  errors.hourlyRate ? 'border-[#BF3636]' : 'border-[#DFE2E5]'
                }`}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737980] font-bold">$</span>
            </div>
            <p className="text-[11px] text-[#737980] mt-1">
              Укажите базовую ставку без чаевых
            </p>
          </div>

          {/* Dynamic Pay Preview Box */}
          <div className="bg-[#FFF8E7] rounded-xl p-3.5 border border-[#FFE399]">
            <span className="text-[28px] font-bold text-[#202326]">
              ${totalPay}
            </span>
            <p className="text-[13px] text-[#737980]">
              ${formData.hourlyRate}/ч × {formData.duration} ч · до налогов
            </p>
            <p className="text-[11px] text-[#737980] mt-0.5">
              Чаевые не включены. Базовая оплата, оценка.
            </p>
          </div>
        </div>

        {/* Section: Место и требования */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-3.5">
          <h3 className="text-[15px] font-bold text-[#202326]">
            Место и требования
          </h3>

          {/* City - Disabled as per spec */}
          <div>
            <label className="text-[13px] font-semibold text-[#202326] block mb-1">
              Город *
            </label>
            <input
              type="text"
              disabled
              value={formData.city}
              className="w-full h-11 px-3.5 rounded-xl border border-[#DFE2E5] bg-[#E3E5E8] text-[#737980] font-medium cursor-not-allowed"
            />
            <p className="text-[11px] text-[#737980] mt-1">
              Город задан для этой демосмены. Адрес и часовой пояс относятся к этому городу.
            </p>
          </div>

          {/* Address */}
          <div>
            <label className="text-[13px] font-semibold text-[#202326] block mb-1">
              Адрес *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full h-11 px-3.5 rounded-xl border text-[15px] text-[#202326] outline-none focus:ring-2 focus:ring-[#FFBE24] ${
                errors.address ? 'border-[#BF3636]' : 'border-[#DFE2E5]'
              }`}
            />
            <p className="text-[11px] text-[#737980] mt-1">
              Главный вход с Валенсия-стрит
            </p>
          </div>

          {/* Requirements (Filled / Multiline 350x170) */}
          <div>
            <label className="text-[13px] font-semibold text-[#202326] block mb-1">
              Требования *
            </label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className={`w-full p-3 rounded-xl border text-[14px] text-[#202326] outline-none focus:ring-2 focus:ring-[#FFBE24] leading-relaxed resize-none ${
                errors.requirements ? 'border-[#BF3636]' : 'border-[#DFE2E5]'
              }`}
            />
            <p className="text-[11px] text-[#737980] mt-1">
              Требования будут видны до принятия смены
            </p>
          </div>

          {/* Instructions */}
          <div>
            <label className="text-[13px] font-semibold text-[#202326] block mb-1">
              Инструкция к выходу
            </label>
            <textarea
              rows={2}
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full p-3 rounded-xl border border-[#DFE2E5] text-[14px] text-[#202326] outline-none focus:ring-2 focus:ring-[#FFBE24] leading-relaxed resize-none"
            />
            <p className="text-[11px] text-[#737980] mt-1">
              Необязательное поле
            </p>
          </div>
        </div>

        <p className="text-[12px] text-[#737980]">
          Проверьте условия: они будут доступны исполнителям после публикации.
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <Button variant="primary" onClick={handleGoToPreview}>
            {isEditing ? 'Сохранить изменения' : 'Опубликовать'}
          </Button>
        </div>
      </div>
    </div>
  );
};
