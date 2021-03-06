import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";

export default class titleController extends ContainerController {
	constructor(element, history) {
		super(element);
		this.setModel({});
		document.addEventListener("ssapp-history-changed", (event)=>{
			this.model.title = event.detail.currentPageTitle;
		});
	}
}