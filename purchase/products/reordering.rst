============================================
Don’t run out of stock with reordering rules
============================================

To make sure you never run out of stock, you can define *Reordering Rules* on products. Thanks to
them, Odoo can help you replenish your stock automatically when it reaches set quantities or
whenever a sales order is created.

.. important:: You need to install the *Inventory app* to have access to reordering rules.

Configure your storable product
===============================

Open or create a product with its *Product Type* set to *Storable Product*.

.. image:: media/reordering-storable-product.png
   :align: center
   :alt: Set the product type in Odoo

As you are purchasing this product from a vendor, go to the product's *Purchase tab* and add a
vendor and a price by clicking on *Add a line*. You can add multiple vendors, but make sure to order
them correctly, since reordering rules always use the first vendor in a list.

.. image:: media/reordering-product-vendor.png
   :align: center
   :alt: Add vendor to a product in Odoo

.. tip::
   By default, a draft purchase order is created. However, if you have enabled *Purchase Agreements*,
   you can *Propose a call for tenders* instead as shown in the image above. For more information,
   see :doc:`../agreements/call_for_tender`

Next, make sure the correct route is selected under the Inventory tab of your product. If you
created your product within the Purchase app, the *Buy* route is selected by default. If you are
looking to dropship your product, select *Dropship*.

.. image:: media/reordering-product-routes.png
   :align: center
   :alt: Choose product routes in Odoo

Set up your reordering rule
===========================

Open your product and click on the *Reordering Rules* button.

.. image:: media/reordering-button.png
   :align: center
   :alt: Reordering rules button on a product in Odoo

Once you are on the product's reordering rules page, click on *Create*.

.. tip::
   You can access and create reordering rules from :menuselection:`Inventory --> Configuration -->
   Reordering Rules` and from :menuselection:`Inventory --> Operations --> Replenishment`.

Define minimum and maximum quantities
-------------------------------------

You can set a **minimum quantity** your stock should always have. Once set, if your stock goes below
the minimum quantity and if you selected the Buy route, a request for quotation is automatically
generated to reach that minimum quantity (plus any additional quantity needed to fill in a sales
order for example).

If you set a **maximum quantity**, every time the product has to be replenished, enough products are
reordered to reach the maximum quantity.

If you want to order only the exact quantity needed to fill in a sales order for example, set both
both the minimum and maximum quantity to **zero**. The quantity mentioned in the sales order is then
used by the reordering rule.

.. image:: media/reordering-create-rule.png
   :align: center
   :alt: Create a reordering rule in Odoo Purchase

.. note:: If you selected multiple routes for the same product under its Inventory tab, make sure to
   select your *Preferred Route* on your reordering rule by clicking on the more options icon (3
   vertical dots), adding the *Preferred Route* column, and selecting the right route.

.. Add link when inventory doc on replenishment is updated for v14. .. seealso:: - :doc:`../../..inventory/xxx/xxx`