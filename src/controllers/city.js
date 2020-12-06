const City = require("../models/city.model");

const opencage = require("opencage-api-client");

const getLatLong = async (cityName) => new Promise((resolve, reject) => {
        opencage
            .geocode({ q: cityName, limit: 3, key: process.env.KEY })
            .then((data) => {
                resolve(data.results[0].geometry);
            })
            .catch((error) => {
                console.log("error", error.message);
            });
    });

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    let p = 0.017453292519943295; // Math.PI / 180
    let c = Math.cos;
    let a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

module.exports = {
    add: async (req, res, next) => {
        try {
            const cityName = req.body.name;
            const allCity = await City.find({}); // checking if city already exits
            const data = await getLatLong(cityName);
            const { lat, lng } = data;
            if (allCity.length) {
                // if exists, then update as there will always be one CITY
                const _id = allCity[0]._id;
                const updateCity = await City.findOneAndUpdate(
                    { _id },
                    {
                        name: cityName,
                        lat: lat,
                        lng: lng,
                    }
                );
                res.status(200).send(updateCity);
            } else {
                // else insert New
                let newCity = new City({
                    name: cityName,
                    lat: lat,
                    lng: lng,
                });

                newCity = await newCity.save();

                res.status(201).json(newCity);
            }
        } catch (error) {
            next(error);
        }
    },
    check: async (req, res, next) => {
        try {
            const data = await getLatLong(req.params.cityName);
            const { lat, lng } = data;

            const defaultData = await City.find({});
            const latDefault = defaultData[0].lat;
            const lngDefault = defaultData[0].lng;

            return res.status(200).send(calculateDistance(lat, lng, latDefault, lngDefault) >
                100
                ? false
                : true);
        } catch (error) {
            next(error);
        }
    },
};
