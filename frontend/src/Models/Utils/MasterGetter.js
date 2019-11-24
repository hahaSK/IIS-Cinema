import { store } from "../../Config/store";
import orm from "../ORM/index";

/**
 * @class MasterGetter
 */
export default class MasterGetter {

    /**
     * Gets Orm Session
     * @returns {Session}
     */
    static getORMSession() {
        const state = store.getState();
        return orm.session(state.entities);
    }

	/**
	 * Get entities
	 * @returns {*}
	 */
	static getEntities () {
		return store.getState().entities;
	}

	/**
	 * Get Currently logged user
	 * @returns {*}
	 */
	static getCurrentUser () {

		const state = store.getState();
		const session = orm.session(state.entities).User;

		return session.withId(state.app.loggedUser);
	}

	/**
	 *
	 * @param languageId
	 * @returns {Model}
	 */
	static getUserLanguage (languageId) {
		// Get User
		let user = MasterGetter.getCurrentUser();

		// Get State
		const state = store.getState();
		const session = orm.session(state.entities);

		// Get user language
		let userLang = session.UserLanguage.all().filter(lang => lang.user === user.id && lang.language === languageId);

		// There is only one ... always..
		return userLang.first();
	}

	/**
	 *
	 * @param relatedItemModel
	 * @param relatedItemReference
	 * @param referenceId
	 */
	static getUserRelatedEntity(entityModel, relatedEntityReference, referenceId){

		let user = MasterGetter.getCurrentUser();
		let session = MasterGetter.getSession();

		console.log(session[entityModel].all().toModelArray());

		let entity = session[entityModel].all().filter(item => item.user === user.id && item[relatedEntityReference] === referenceId);

		if(entity.count() === 1){
			return entity.first();
		}else{
			console.log(entity.toModelArray());
			return null;
		}

	}

	/**
	 * Return ORM Session with entities
	 * @return {Session}
	 */
	static getSession(entities = null) {

		if(entities === null){
			entities = store.getState().entities;
		}

		// Get State
		const session = orm.session(entities);

		return session;
	}

	/**
	 * Check if member logged
	 * @returns {boolean}
	 */
	static isUserLogged () {

		const state = store.getState();
		return (typeof state.app.loggedUser === "string");

	}

	/**
	 * Get app
	 */
	static getApp () {

		const state = store.getState();
		return state.app;

	}

	/**
	 *
	 * @param userId
	 * @param entities
	 * @return {Model}
	 */
	static getUser (userId, entities) {

		let session = orm.session(entities);
		return session.User.withId(userId);
	}

}