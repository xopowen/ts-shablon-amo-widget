
/**
 * Язык акканта
 * @readonly
 * @enum {string}
 */
export enum Langs {
	Russian = 'ru',
	English = 'en',
	Spanish = 'es',
	Portuguese = 'pt',
}

/**
 * Окружение
 * @readonly
 * @enum {string}
 */
export enum Environment {
	Production = 'production'
}

/**
 * Формат времени
 * @readonly
 * @enum {number}
 */
export enum TimeFormat {
	European = 24,
	USA = 12
}

/**
 * Переменные аккаунта 
 * @readonly
 * @enum {string}
 */
export enum Constants {
	IsKommo = 'is_kommo',
	Account = 'account',
	Environment = 'env',
	DigitalPipeline = 'dp',
	EntityNames = 'entity_names',
	AmoMail = 'amomail',
	AmocrmDrive = 'amocrm_drive',
	GoogleMapsApiKey = 'google_embed_maps_api_key',
	UnsortedToken = 'unsorted_token',
	amoForms = 'amoforms',
	Features = 'features',
	User = 'user',
	VersionBackend = 'version_backend',
	Version = 'version',
	UserRights = 'user_rights',
	Managers = 'managers',
	FreeUsers = 'free_users',
	Groups = 'groups',
	Limits = 'limits',
	FrontLoadStart = 'front-load-start',
	Notifications = 'notifications',
	SocialApp = 'social_apps',
	AmojoOrigins = 'amojo_origins',
	AmojoBots = 'amojo_bots',
	MainPipeline = 'main_pipeline',
	LeadsSoursesTypes = 'leads_sources_types',
	UnsortedStatuses = 'unsorted_statuses',
	UnsortedCategories = 'unsorted_categories',
	ShowOldTour = 'show_old_tour',
	AmoMessenger = 'amo_messenger',
	AmocrmWhatsapp = 'amocrm_whatsapp',
	CurrentBrand = 'current_brand',
	GlobalBrandName = 'global_brand_name',
	CurrentBrandDomain = 'current_brand_domain',
	Server = 'server',
	SessionToken = 'session_token',
	PeriodicityEnabled = 'periodicity_enabled',
	IpInfo = 'ip_info',	
	LeftMenu = 'left_menu',
	GeoIpCountry= 'geoip_country',
}

export enum Entities {
	Leads = 'leads',
	Contacts = 'contacts',
	Customers = 'customers'
}

/**
 * @see {@link https://www.amocrm.ru/developers/content/web_sdk/js_sdk} - JS-SDK
 * @type {Application}
 */
export type Application = {
	data: {
		/**
		 * В любом интерфейсе системы (кроме карточек)
		 */
		current_view?: {

			/**
			 * который хранит корневой DOM-элемент текущего интерфейса
			 */
			$el: HTMLElement
		}


		/**
		 * Если пользователь находится в карточке
		 */
		current_card?: {
			id?: number,
			model?: any
		}|false

		/**
		 *@description
		 *  Если пользователь находится в любом интерфейсе списков
		 *  (сделки, контакты/компании, покупатели, задачи)
		 */
		current_list?:Array<HTMLElement>|Array<{id:number,  name:string,   checked:boolean }>
	},
	sdk: {
		/**
		 * @description
		 * Метод для установки статуса звонка
		 * @param status
		 */
		setCallingStatus(status: boolean): void,
		/**
		 * @description
		 * Метод для получения статуса звонка
		 */
		setCallingStatus(): boolean,
		/**
		 *@description
		 * Данный метод позволяет получать информацию об online статусах пользователей
		 */
		showUserStatus(): Record<string, never>,

		/**
		 * @description массив всех id пользователей online
		 * @param {string} status
		 */
		showUserStatus(status:'online'):Array<number>

		/**
		 * @description Получение статуса online пользователя по его id
		 * @param {number} id_user
		 */
		showUserStatus(id_user:number):boolean

	},
	static_domain: string,
	static_build_domain: string,
	cdn_domain: string,
	need_cdn: string,
	environment: Environment,
	/**
	 * В свойстве хранится буквенный код языка, установленного в профиле пользователя.
	 */
	lang_id: Langs,
	system: {
		date: {
			ull: string,
			date: string,
			time: string,
			date_short: string,
			calendar: string,
			calendar_no_year: string
		},
		time: TimeFormat,
		timezone: string;
	}

	/**
	 * Получение констант площадки amoCRM/Kommo
	 * @param {Constants} name
	 * @see {@link https://www.amocrm.ru/developers/content/web_sdk/env_variables}
	 * @example
	 * const account = APP.constant<AccountData>(Constants.Account);
	 * @returns {T}
	 */
	constant: <T = never>(name: Constants, value?: never) => T,
	todo_types: Record<number,string>,
	note_types: Record<string,number>
	cf_types: Record<string,number>,
	notifications:{
		/**
		 * @description
		 * В системе реализована возможность выводить в правом нижнем углу окошко с уведомлением.
		 */
		add_call(data:{
			from?: string,
			to?:string,
			duration?: number,
			link?: string,
			text?:string,
			date?: Date
		})
		/**
		 *
		 * @param {
		 *     {
		 * 				header: number ,
		 * 				text: string ,
		 * 				date: Date
		 * 			}
		 * } n_data {header: код виджета
		 *                text: текст уведомления об ошибке
		 *                date: дата}
		 * @param {{done:function,fail:function,always:function}} callbacks
		 * объект функций обратного вызова.
		 * При добавлении нового сообщения или ошибки AJAX запрос
		 * отправляется на сервер, зависимости от успешности запроса срабатывает
		 * одна из переданных функций данного объекта
		 */
		add_error(
			n_data:{
				header: number ,//код виджета
				text: string ,//'<p>' + text + '</p>'текст уведомления об ошибке
				date: Date //дата
			},
			callbacks:{
				//успешно добавлено и сохранено AJAX done
				done():any  ;
				//AJAX fail
				fail ():any
				//вызывается всегда
				always ():any
			});
	},
	/**
	 * Метод вернет строку с указанием сущности, в которой мы сейчас находимся
	 */
	getBaseEntity(): Entities,
	/**
	 * @description находимся ли мы в данный момент в карточке
	 */
	isCard(): boolean,
	/**
	 * Метод вернет код текущей страницы.
	 * @see Areas
	 */
	getWidgetsArea():string,


}


