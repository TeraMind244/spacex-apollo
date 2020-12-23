const { RESTDataSource } = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "https://api.spacexdata.com/v2/";
	}

	async getAllLaunches() {
		const response = await this.get("launches");
		return Array.isArray(response)
			? response.map((launch) => this.launchReducer(launch))
			: [];
	}

	launchReducer(launch) {
		const {
			flight_number,
			launch_site,
			mission_name,
			links: {
				mission_patch_small: missionPatchSmall,
				mission_patch: missionPatchLarge,
			},
			rocket: { rocket_id: id, rocket_name: name, rocket_type: type },
		} = launch;
		return {
			id: flight_number || 0,
			cursor: `${flight_number || 0}`,
			site: launch_site?.site_name,
			mission: {
				name: mission_name,
				missionPatchSmall,
				missionPatchLarge,
			},
			rocket: {
				id,
				name,
				type,
			},
		};
	}

	async getLaunchById({ launchId }) {
		const response = await this.get("launches", {
			flight_number: launchId,
		});
		return this.launchReducer(response[0]);
	}

	getLaunchesByIds({ launchIds }) {
		return Promise.all(
			launchIds.map((launchId) => this.getLaunchById({ launchId }))
		);
	}
}

module.exports = LaunchAPI;
