$(function(){

    var data = [];
    var submitButton = $('.submit');
    var changeButton = $('.change');
    var changeDestinationButton = $('.btn-arrows');
    var reset = $('.link-change-dest');
    var destinationFrom = $('.main-form-dest-from');
    var destinationTo = $('.main-form-dest-to');
    var toggleVisibleTable = $('.main-form-table');
    var selectedFromCity = $('.point-from-main');
    var selectedToCity = $('.point-to-main');
    var selectedFromInfo = $('.point-from-add');
    var selectedToInfo = $('.point-to-add');
    var selectedDestFromCity;
    var selectedDestToCity;
    var selectedDestFromInfo;
    var selectedDestToInfo;

    /**
     * Инициализация select'ов
     * @param control
     * @param placeholder
     * @constructor
     */
    function InitSelect2(control, placeholder){
        control.select2({
            allowClear: true,
            maximumSelectionSize: 1,
            placeholder: placeholder,
            templateResult: formatResult,
            templateSelection: formatSelection
        }).on("select2:unselecting", function(e) {
            $(this).data('state', 'unselected');
        }).on("select2:open", function(e) {
            if ($(this).data('state') === 'unselected') {
                $(this).removeData('state');
                var self = $(this);
                setTimeout(function() {
                    self.select2('close');
                }, 1);
            }
        });
    }

    /**
     * Подгружаем список городов из файла
     * @constructor
     */
    function LoadSourceData(){
        $.getJSON('data/cities.json', function(resp){
            for (var item in resp){
                if (resp[item]) {
                    var currentItem = {};
                    currentItem.id = resp[item].CityId;
                    currentItem.cityName = resp[item].CityName;
                    currentItem.regionName = resp[item].RegionName;
                    currentItem.countryName = resp[item].CountryName;
                    AddOptions(currentItem);
                    data.push(currentItem);
                }
            }
            Init();
        });
    }

    /**
     * Добавление строк
     */
    function AddOptions(currentItem){
        var option = '<option ';
        if (currentItem){
            option += 'value=\'' + currentItem.id + '\' reg=\'' + currentItem.regionName + '\' cnt=\'' + currentItem.countryName + '\'>';
            option += currentItem.cityName + '</option>';
            destinationFrom.append(option);
            destinationTo.append(option);
        }
    }

    /**
     * Инициализация select'ов
     * @constructor
     */
    function Init(){
        InitSelect2(destinationFrom, 'Откуда');
        InitSelect2(destinationTo, 'Куда');

        RestoreData();
    }

    /**
     * Форматируем строки в выпадашке
     */
    function formatResult(item){
        return format(item, true);
    }

    /**
     * форматируем выбранную строку
     */
    function formatSelection(item){
        return format(item, false);
    }

    /**
     * Форматируем вывод в select
     * @param item текущая строка
     * @param type true - selections, false - selected
     */
    function format(item, type) {
        var retItem;
        var current_option;
        if(!item.id) {
            return item.text;
        }
        current_option = $('option[value='+item.id+']');

        retItem = '<span class="option-font">' + (type ? '<strong>' : '') + item.text + (type ? '</strong>' : '');

        retItem += (type ? '<span class="add-info">' : '');

        if (current_option.attr('reg') !== 'null'){
            retItem += ', ' + current_option.attr('reg');
        }
        if (current_option.attr('cnt') !== 'null'){
            retItem += ', ' + current_option.attr('cnt');
        }
        retItem += '</span>';
        retItem += (type ? '</span>' : '');
        return $(retItem);
    }

    /**
     * Меняем местами пункта назначения и отправления
     * @constructor
     */
    function ChangeDestinations(){
        var currentDestinationTo = destinationTo.val();
        destinationTo.val(destinationFrom.val()).trigger('change');
        destinationFrom.val(currentDestinationTo).trigger('change');
    }

    /**
     * Получение данных по ID
     */
    function GetTitlesById(id){
        var current = {};
        for (var item in data){
            if (data[item].id === id){
                if (data[item].regionName !== null ) current.regionName = data[item].regionName;
                current.cityName = data[item].cityName;
                current.countryName = data[item].countryName;
            }
        }
        return current;
    }

    /**
     * Сохранение данных
     */
    function StoreData(fromKey, toKey){
        localStorage.setItem('destinationFromKey', fromKey);
        localStorage.setItem('destinationToKey', toKey);
    }

    /**
     * Восстановление данных
     */
    function RestoreData(){
        var fromId = +localStorage.getItem('destinationFromKey');
        var toId = +localStorage.getItem('destinationToKey');
        if (fromId && fromId > 0 && toId && toId > 0){
            PopulateData(fromId, toId);
        }
    }

    /**
     * Заполнение данных
     */
    function PopulateData(fromId, toId){
        var from;
        var to;
        from = GetTitlesById(fromId);
        to = GetTitlesById(toId);
        selectedDestFromCity = from.cityName;
        selectedDestToCity = to.cityName;
        if (from.regionName){
            selectedDestFromInfo =  from.regionName + ', ';
        }
        selectedDestToInfo = to.regionName ? to.regionName + ', ' : '';
        selectedDestFromInfo += from.countryName;
        selectedDestToInfo += to.countryName;
        if (selectedDestFromCity !== '' && selectedDestToCity !== '') {
            selectedFromCity.empty().text(selectedDestFromCity);
            selectedToCity.empty().text(selectedDestToCity);
            selectedFromInfo.empty().text(selectedDestFromInfo);
            selectedToInfo.empty().text(selectedDestToInfo);
            toggleVisibleTable.toggle();
            StoreData(fromId, toId);
        }
    }


    submitButton.on('click', function(){
        if (destinationFrom.val() !== null && destinationFrom.val() !== '' && destinationTo.val() !== ''){
            PopulateData(+destinationFrom.val(), +destinationTo.val());
        }
    });

    changeDestinationButton.on('click', function(){
        ChangeDestinations();
    });

    changeButton.on('click', function(){
        destinationFrom.val(+localStorage.getItem('destinationFromKey')).trigger('change');
        destinationTo.val(+localStorage.getItem('destinationToKey')).trigger('change');
        localStorage.clear();
        toggleVisibleTable.toggle();
    });

    reset.on('click', function(){
        destinationFrom.val(0).trigger('change');
        destinationTo.val(0).trigger('change');
        localStorage.clear();
        toggleVisibleTable.toggle();
    });

    /**
     * Запуск приложения
     */
    LoadSourceData();
});