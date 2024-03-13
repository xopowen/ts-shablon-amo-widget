export interface CallbacksInterface {
	/**
	 *
	 * @param $settings_body
	 * @param context
	 */
	settings(
		$settings_body: HTMLElement, 
		context: Record<string,never>|undefined
	): Promise<boolean>,
	bind_actions(): Promise<boolean>,
	init(): Promise<boolean>,
	render(): Promise<boolean>,

	/**
	 * @description Метод callbacks.dpSettings аналогичен callbacks.settings,
	 * но вызывается в области видимости
	 * @see https://www.amocrm.ru/developers/content/digital_pipeline/integrations
	 * @see settings
	 */
	dpSettings?(): Promise<boolean>,

	/**
	 * @description  вызывается на странице расширенных настроек виджета.
	 * @description для работы необходимо указать область подключения виджета advanced_settings
	 * @see Areas.AdvancedSettings
	 */
	advancedSettings?(): Promise<boolean>,

	/**
	 * @description вызывается при отключении виджета через меню его настроек и
	 * @description при переходе между областями отображения виджета.
	 */
	destroy?(): Promise<boolean>,

	/**
	 * @description   определяет логику работы действия виджета в Salesbot
	 * и вызывается, если был добавлен виджет в конструкторе Salesbot, при сохранении.
	 */
	onSalesbotDesignerSave?(): Promise<boolean>,
	contacts?: {
		/**
		 * @description вызывается в случае выбора элементов списка контактов,
		 * использованием checkbox, и последующем нажатии на имя виджета
		 * в добавочном меню.
		 */
		selected(): Promise<boolean>,
	}
	leads?: {
		/**
		 * @description вызывается в случае выбора элементов списка сделок,
		 * использованием checkbox, и последующем нажатии на имя виджета
		 * в добавочном меню.
		 */
		selected(): Promise<boolean>,
	}
	todo?: {
		/**
		 * @description вызывается в случае выбора элементов списка задач,
		 * использованием checkbox, и последующем нажатии на имя виджета
		 * в добавочном меню.
		 */
		selected(): Promise<boolean>,
	}
	/**
	 * @description Данная функция определяет логику работы источника
	 * и вызывается если был использован какой то источник.
	 * @description Например если пользователь отправил sms.
	 */
	onSource?: Promise<boolean>,

	/**
	 * @description вызывается при щелчке пользователя на кнопке “Установить/Сохранить”
	 * в настройках виджета.
	 * @description Так же этот метод срабатывает при отключении виджета.
	 * @description Сначала срабатывает onSave, затем destroy
	 */
	onSave?():Boolean|	 Promise<boolean>,

	/**
	 * @description Данная функция вызывается при добавлении виджета
	 * как источника в настройках воронки.
	 * @param pipelineId
	 */
    onAddAsSource?(
    	pipelineId: number
    ): Promise<boolean>,

	/**
	 * @description Если виджет предоставляет возможность синхронизации задач
	 * amoCRM с другими сервисами управления задачами
	 * @description необходимо указать локейшны задач в manifest.json  "tcalendar"
	 */
	calendarSync?():CalendarSync
}


export type CalendarSync = {
	//Заголовок виджета в модалке синхронизации
	//example this.langs.widget.name,
	name: string

	//Описание виджета в модалке синхронизации
	//example this.langs.widget.description
	description: string,

	// {Boolean|Promise} Состояние синхронизации.
	// Если Boolean, то виджет сразу примет это состояние,
	// но обычно нужно сделать запрос на back-end,
	// поэтому можно вернуть promise, где resolve(true|false)
	// задаст состояние синхронизации виджета после получения ответа,
	// А reject([error_msg]) выведет сообщение об ошибке.
	enabled:Boolean|Promise<Boolean>,


	/**
	 * @description   Callback на нажатие кнопки "Включить".
	 * @description Должен вернуть Promise
	 * @example
	 * new Promise(function(resolve, reject) {
	 * 	if (confirm('Вы действительно хотите установить виджет')) {
	 * 	resolve();
	 * 	} else {
	 * 		reject('Вы отказались от установки виджета')
	 * 	}
	 * 	},
	 */
	onEnable:Promise<Boolean>



	/**
	 * @description Callback на нажатие кнопки "Отключить".
	 * @description Должен вернуть Promise
	 * @example
	 * new Promise(function(resolve, reject) {
	 * 			var answer = prompt('Введите секретный ключ для подтверждения отключения:');
	 *
	 * 			if (answer === 'Super manager!') {
	 * 				resolve();
	 * 			} else {
	 * 				reject('Неверный секретный ключ.')
	 * 			}
	 * 		}
	 */
	onDisable: Promise<Boolean>

	// {Function} - Необязательный Callback на нажатие кнопки настроек.
	// Когда есть, в правом углу виджета появляется шестеренка с настройками.
	// На нажатие по ней можно написать свою логику.
	// Функция может ничего не возвращать.
	onSetup: any

}

/**
 * Области подключения
 * @enum
 */
export enum Areas {
	LeadCard = 'lcard',
	CustomerCard = 'cucard',
	ContactCard = 'ccard',
	CompanyCard = 'comcard',
	LeadsList = 'llist',
	CustomersList = 'culist',
	ContactsList = 'clist',
	TasksList = 'tlist',
	TasksLine = 'tline',
	TasksCalendar = 'tcalendar',
	Settings = 'settings',
	AdvancedSettings = 'advanced_settings',
	CardSDK = 'card_sdk',
	Catalogs = 'catalogs',
	DigitalPipeline = 'digital_pipeline',
	LeadSources = 'lead_sources',
	WhatsappModal = 'whatsapp_modal',
	Everywhere = 'everywhere'
}

export type System = {
	area: Areas,
	amohash: string,
	amouser: string,
	amouser_id: number;
	displayed_count: number;
	displayed_count_by_area: {
		salesbot_designer: number;
		widgetsSettings: number;
	};
	domain: string;
	server: string;
	subdomain: string;
}

export enum Activity {
	Active = 'Y',
	NotActive = 'N'
}

export enum Statuses {
	Install = "install",
	Installed = "installed",
	Error = "error",
	NotConfigured = "not_configured"
}

/**
 *params from files of folder i18n
 */
export type Langs= any

export type Settings = {
	active: Activity,
	category_code: string;
	id: number;
	path: string;
	images_path: string;
	oauth_client_uuid: string;
	status: Statuses,
	support: {
		email: string,
		link: string;
		name: string;
		privacy_policy: string;
	};
	version: string;
	widget_active: Activity,
	widget_code: string;
}

export interface Widget {
	callbacks: CallbacksInterface,
	system?(): System
	get_settings?(): Object,
	i18n?(name: string): Record<string,string>|string
	set_settings?(settings: Record<string, string>): void;
	widgetsOverlay?(status: boolean): void;
	set_status?(status: Statuses): void;
	get_version?(): string;
	get_install_status?(): Statuses;



	/**
	 * Подписанный запрос к стороннему сервису
	 * Дублирует $.ajax
	 * @see {@link https://www.amocrm.ru/developers/content/web_sdk/mechanics}
	 * @type {[type]}
	 */
	$authorizedAjax?<T = any>(settings: any): Promise<T>
}	

export type Template  = {data:string} | {ref:string}
export type Render = string
