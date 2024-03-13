/**
 * Главный модуль виджета
 * @module template/main
 * @author Gate <hello@amgate.ru>
 */
import { bind } from 'underscore';
import {Widget, Settings, System, Statuses, Template, Render, Langs} from './types/widget.types';
import { Application, Constants } from './types/global.types';

declare const AMOCRM: Application;

/**
 * Widget template
 * @class  WidgetTemplate
 * @author Gate <hello@amgate.ru>
 * @implements {Widget}
 * @see {@link https://www.amocrm.ru/developers/content/integrations/script_js}
 */
export default class WidgetTemplate implements Widget {

    /**
     *@description Метод является оборачивающим для twig.js
     * @param data  информацию по шаблону
     * @param params данные для рендеринга данного шаблона
     * @return twig(data).render(params)
     */
    render?(data:Template,params:any):Render

    /**
     * @description
     * оборачивает переданную ему разметку или шаблон в стандартную
     * для виджетов оболочку (разметку) и помещает полученную
     * разметку в правую колонку виджетов
     * @param data
     * @param params
     */
    render_template?(data:Template,params:any):Render

    /**
     * позволяет изменять параметры, установленные по умолчанию файлами из папки i18n
     * @param langs
     */
    set_lang?(langs:Langs):void
    /**
     * Внутренние параметры
     * @readonly
     * @type ApplicationSystem
     */
    system?(): System
    // /**
    //  * Настройки
    //  * @readonly
    //  * @type Function(): ApplicationSettings
    //  */
    // get_settings?(): Settings

    /**
     * @description позволяет добавлять виджету свойства.
     * @param settings
     */
    set_settings?(settings: Record<string, string>):void

    /**
     * @description
     * возвращает выделенные галочками контакты/сделки
     * из таблицы контактов/сделок в виде массива
     * @return {
     * { count_selected:number, selected:{
     *         emails: Array<any>,
     *             id: number,
     *             phones: Array<any>,
     *             type: string
     *     }}
     *     } Object
     */
    list_selected?():{ count_selected:number, selected:{
        emails: Array<any>,
            id: number,
            phones: Array<any>,
            type: string
    }}

    /**
     * @description
     * включает или отключает оверлей, который появляется
     * при вызове виджета из списка контактов или сделок.
     * @param {boolean} status
     */
    widgetsOverlay?(status: boolean): void;

    /**
     * @description работает в списке контактов и компании
     * добавляет эффект при щелчке на номере телефона или адресе e-mail.
     * @param {"phone"|'e-mail' } type
     * @param {function} action
     */
    add_action?(type: "phone"|'e-mail' ,action:()=>{}):void


    /**
     * @description
     * Данные метод позволяет, получить объект из языковых файлов,
     * в котором будут сообщения на языковых локалях, используемые пользователем
     * @param {string} name имя объекта, который необходимо вытащить
     * @return {Record<string,string>|string}
     */
    i18n?(name: string): Record<string,string>|string


    /**
     * @description
     * Статус виджета отображен в области settings, на иконке виджета.
     * @description
     * можно использовать для показа, что данные для работы виджета неверны.
     * @param {Statuses} status
     */
    set_status?(status: Statuses): void;

    /**
     * @description
     * Позволяет указать новый источник,
     * который будет отображаться
     * в контроле в нижней части фида карточки сделки,
     * покупателя, контакта или компании.
     * @description На данный момент можно указать только один тип источника – sms
     *@param {'sms' } source_type
     *@param {callbacks} handler  будет вызываться при клике на кнопку “отправить”.
     */
    add_source?(source_type:'sms', handler:()=>{}):void
    /**
     * Возвращает текущую версию из манифеста
     * @readonly
     * @type string
     */
    get_version?(): string;

    /**
     * @description используется для отправки запроса на ваш удаленный сервер через прокси-сервер amoCRM.
     * @param {string} url url
     * @param {Response.body} data Response.body
     * @param {callback} callback callback
     * @param {'xml'|'html'|'script'|'json'|'jsonp'|'text'} type string
     */
    crm_post?(url, data, callback, type):void

    /**
     * @description
     * Данный метод необходим,
     * для того, чтобы получить данные,
     * которые ввел пользователь при подключении виджета.
     */
    get_settings?():Object

    /**
     * @description вернет статус установки виджета
     */
    get_install_status?():Statuses

    /**
     * Коллбеки
     * @readonly
     * @type Record<string, Function | Record<string, Function>>
     */
    callbacks = {
        /**
         * @description Модалка виджета в amoМаркет-е
         * @description Метод callbacks.settings вызывается при щелчке на иконку виджета в области настроек.
         * @async
         * @returns {Promise<boolean>}
         */
        settings: bind(async (): Promise<boolean> => {

            return true;
        }, this),



        /**
         * @description Инициализация виджета
         * @description Метод init() обычно используется для сбора необходимой информации и других действий,
         * например связи с сторонним сервером и авторизации по API, если виджет используется
         * для передачи или запроса информации стороннему серверу.
         * @description В самом простом случае он может
         * ,к примеру,определять текущую локацию, где находится пользователь
         * @async
         * @returns {Promise<boolean>}
         */
        init: bind(async (): Promise<boolean> => {
            return true;
        }, this),

        /**
         * В этом методе обычно описываются действия для отображения виджета.
         * необходимо использовать специальные методы в этой функции,
         * например методы объекта render() и/или render_template(),
         * @async
         * @returns {Promise<boolean>}
         */
        render: bind(async (): Promise<boolean> => {
            return true;
        }, this),

        /**
         * @description init client action for dom elements
         * @description
         * используется для навешивания событий на действия предпринимаемые пользователем.
         * @description например нажатие пользователя на кнопку.
         * @async
         * @returns {Promise<boolean>}
         */
        bind_actions: bind(async (): Promise<boolean> => {
            return true;
        }, this),

    }

    /**
     * @constructor
     * @returns {Widget}
     */
    constructor() {
        return this;
    }


}
