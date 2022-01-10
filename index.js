const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();
let port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
        let items = [];
        const qne_url = "https://qne.com.pk/";
    
        try {
            const response = await axios.get(qne_url);
            const $ = await cheerio.load(response.data);
    
            $("#shopify-section-1628509903cbf4d7d4 > section > div:nth-child(2) > div > div > div > div > div > div:nth-child(1)").each((i, el) => {
                const name = $(el).find(".product-item__title.text--strong.link").text().trim();
                // console.log("name",name)
                const price = $(el)
                    .find(".price.price--highlight")
                    .text() 
                    .trim()
                    .replace(/\r?\n|\r/g, "");
    
                const company_name = $(el).find(".product-item__vendor.link").text().trim()
                const linkBuild = "https://qne.com.pk/"
                const link = $(el).find(".product-item__title.text--strong.link").attr("href")
                const image = $(el).find('aspect-ratio aspect-ratio--square > img').attr('srcset')
                console.log("name",image)
                var item = {
                    Name: name,
                    price: price,
                    company_name: company_name,
                    link : linkBuild.concat(link),
                    image : image
                };
    console.log(item);
                items.push(item);
                
            });
        
        } catch (error) {
            console.log(error);
        }
    var a = JSON.stringify(items)
    res.send(a);})

    
app.get("/feem", async (req, res) => {
    
        let items = [];
        const qne_url = "https://grocer.pk/?s=&product_cat=grocery&post_type=product";
    
        try {
            const response = await axios.get(qne_url);
    
            const $ = cheerio.load(response.data);
            $(".thunk-product-wrap").each((i, el) => {
                const name = $(el).find(".woocommerce-loop-product__title").text().trim();
                
                const price = $(el)
                    .find(".price")
                    .text()
                    .trim()
                    .replace(/\r?\n|\r/g, "");
    
                // const description = $(el).find(".snize-description").text().trim()
                const link = $(el).find(".thunk-product-content > a").attr("href")
                const image = $(el).find(".thunk-product-image > a > img").attr('src')
                var item = {
                    Name: name,
                    price: price,
                    image: image,
                    link : (link)
                };
    
                items.push(item);
            });
        } catch (error) {
            console.log(error);
        }
    
        var a = JSON.stringify(items)
        res.send(a);})

app.get("/sami", async (req, res) => {
    let items = [];
    const qne_url = "http://www.foodpakistan.pk/city/food-delivery-islamabad";

    try {
        const response = await axios.get(qne_url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Mobile Safari/537.36",
            },
        });

        const $ = cheerio.load(response.data);
        console.log("res",response)
        $(".GridLex-col-3_sm-4_xs-6_xss-12").each((i, el) => {
            const name = $(el).find(".heading.text-primary.font700").text().trim();
            const type = $(el).find(".texting.font600").text().trim();
            
            const image = $(el)
                .find(".image > img").attr('src')
               

            const link = $(el).find(".top-company-2 > a").attr("href")
            var item = {
                Name: name,
                type: type,
                image: image,
                link : link
            };

            items.push(item);
        });
    } catch (error) {
        console.log(error);
    }

    var a = JSON.stringify(items)
    res.send(a);})       
app.listen(port, () => {
    console.log("Listening at port:", `${port}`);
})
